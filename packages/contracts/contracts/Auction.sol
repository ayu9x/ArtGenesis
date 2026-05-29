// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Auction
 * @dev Timed English auctions with escrow, time extensions, and royalties.
 */
contract Auction is ERC721Holder, ReentrancyGuard, Ownable {
    uint256 private _auctionIds;

    uint256 public platformFeeBasisPoints;
    address payable public treasury;
    uint256 public constant TIME_EXTENSION = 5 minutes;
    uint256 public constant MIN_BID_INCREMENT_BPS = 500; // 5%

    enum AuctionStatus { Active, Settled, Cancelled }

    struct AuctionItem {
        uint256 auctionId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        uint256 startingPrice;
        uint256 startTime;
        uint256 endTime;
        address payable highestBidder;
        uint256 highestBid;
        AuctionStatus status;
    }

    mapping(uint256 => AuctionItem) public auctions;

    event AuctionCreated(uint256 indexed auctionId, address indexed nftContract, uint256 indexed tokenId, address seller, uint256 startingPrice, uint256 startTime, uint256 endTime);
    event BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 amount, uint256 newEndTime);
    event AuctionSettled(uint256 indexed auctionId, address indexed winner, uint256 amount);
    event AuctionCancelled(uint256 indexed auctionId);
    event PlatformFeeUpdated(uint256 newFee);
    event TreasuryUpdated(address newTreasury);

    constructor(uint256 _platformFee, address payable _treasury) Ownable(msg.sender) {
        require(_platformFee <= 1000, "Fee too high");
        require(_treasury != address(0), "Invalid treasury");
        platformFeeBasisPoints = _platformFee;
        treasury = _treasury;
        _auctionIds = 1;
    }

    function createAuction(
        address nftContract,
        uint256 tokenId,
        uint256 startingPrice,
        uint256 duration
    ) external nonReentrant returns (uint256) {
        require(startingPrice > 0, "Starting price must be > 0");
        require(duration > 0, "Duration must be > 0");

        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(nft.isApprovedForAll(msg.sender, address(this)) || nft.getApproved(tokenId) == address(this), "Not approved");

        uint256 auctionId = _auctionIds++;
        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + duration;

        auctions[auctionId] = AuctionItem(
            auctionId,
            nftContract,
            tokenId,
            payable(msg.sender),
            startingPrice,
            startTime,
            endTime,
            payable(address(0)),
            0,
            AuctionStatus.Active
        );

        // Escrow the NFT
        nft.safeTransferFrom(msg.sender, address(this), tokenId);

        emit AuctionCreated(auctionId, nftContract, tokenId, msg.sender, startingPrice, startTime, endTime);
        return auctionId;
    }

    function placeBid(uint256 auctionId) external payable nonReentrant {
        AuctionItem storage auction = auctions[auctionId];
        require(auction.status == AuctionStatus.Active, "Auction is not active");
        require(block.timestamp >= auction.startTime, "Auction hasn't started");
        require(block.timestamp <= auction.endTime, "Auction ended");

        uint256 minBid = auction.highestBid == 0 
            ? auction.startingPrice 
            : auction.highestBid + ((auction.highestBid * MIN_BID_INCREMENT_BPS) / 10000);
            
        require(msg.value >= minBid, "Bid too low");

        // Refund previous bidder
        if (auction.highestBidder != address(0)) {
            (bool success, ) = auction.highestBidder.call{value: auction.highestBid}("");
            require(success, "Refund failed");
        }

        auction.highestBidder = payable(msg.sender);
        auction.highestBid = msg.value;

        // Snipe protection: Extend end time if bid placed near the end
        if (auction.endTime - block.timestamp < TIME_EXTENSION) {
            auction.endTime = block.timestamp + TIME_EXTENSION;
        }

        emit BidPlaced(auctionId, msg.sender, msg.value, auction.endTime);
    }

    function settleAuction(uint256 auctionId) external nonReentrant {
        AuctionItem storage auction = auctions[auctionId];
        require(auction.status == AuctionStatus.Active, "Auction is not active");
        require(block.timestamp > auction.endTime, "Auction still ongoing");

        auction.status = AuctionStatus.Settled;

        if (auction.highestBidder == address(0)) {
            // No bids, return to seller
            IERC721(auction.nftContract).safeTransferFrom(address(this), auction.seller, auction.tokenId);
            emit AuctionSettled(auctionId, address(0), 0);
            return;
        }

        // Calculate fees and royalties
        uint256 royaltyAmount = 0;
        address royaltyReceiver = address(0);
        
        try IERC2981(auction.nftContract).royaltyInfo(auction.tokenId, auction.highestBid) returns (address receiver, uint256 amount) {
            royaltyReceiver = receiver;
            royaltyAmount = amount;
        } catch {}

        uint256 platformFee = (auction.highestBid * platformFeeBasisPoints) / 10000;
        uint256 sellerAmount = auction.highestBid - platformFee - royaltyAmount;

        // Transfer NFT to winner
        IERC721(auction.nftContract).safeTransferFrom(address(this), auction.highestBidder, auction.tokenId);

        // Distribute funds
        if (platformFee > 0) {
            (bool success, ) = treasury.call{value: platformFee}("");
            require(success, "Platform fee transfer failed");
        }
        
        if (royaltyAmount > 0 && royaltyReceiver != address(0)) {
            (bool success, ) = payable(royaltyReceiver).call{value: royaltyAmount}("");
            require(success, "Royalty transfer failed");
        }

        (bool sellerSuccess, ) = auction.seller.call{value: sellerAmount}("");
        require(sellerSuccess, "Seller transfer failed");

        emit AuctionSettled(auctionId, auction.highestBidder, auction.highestBid);
    }

    function cancelAuction(uint256 auctionId) external nonReentrant {
        AuctionItem storage auction = auctions[auctionId];
        require(auction.status == AuctionStatus.Active, "Auction is not active");
        require(auction.seller == msg.sender, "Not the seller");
        require(auction.highestBidder == address(0), "Cannot cancel with bids");

        auction.status = AuctionStatus.Cancelled;

        // Return NFT
        IERC721(auction.nftContract).safeTransferFrom(address(this), msg.sender, auction.tokenId);

        emit AuctionCancelled(auctionId);
    }

    function setPlatformFee(uint256 _platformFee) external onlyOwner {
        require(_platformFee <= 1000, "Fee too high");
        platformFeeBasisPoints = _platformFee;
        emit PlatformFeeUpdated(_platformFee);
    }

    function setTreasury(address payable _treasury) external onlyOwner {
        require(_treasury != address(0), "Invalid treasury");
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }
}
