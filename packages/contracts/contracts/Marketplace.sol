// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Marketplace
 * @dev Fixed-price marketplace with escrow.
 */
contract Marketplace is ERC721Holder, ReentrancyGuard, Ownable {
    uint256 private _listingIds;
    
    // Platform fee in basis points (e.g., 250 = 2.5%)
    uint256 public platformFeeBasisPoints;
    address payable public treasury;

    enum ListingStatus { Active, Sold, Cancelled }

    struct Listing {
        uint256 listingId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        uint256 price;
        ListingStatus status;
    }

    mapping(uint256 => Listing) public listings;

    event ListingCreated(
        uint256 indexed listingId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );
    
    event ListingSold(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 price
    );
    
    event ListingCancelled(uint256 indexed listingId);
    event PlatformFeeUpdated(uint256 newFee);
    event TreasuryUpdated(address newTreasury);

    constructor(uint256 _platformFee, address payable _treasury) Ownable(msg.sender) {
        require(_platformFee <= 1000, "Fee too high"); // max 10%
        require(_treasury != address(0), "Invalid treasury");
        platformFeeBasisPoints = _platformFee;
        treasury = _treasury;
        _listingIds = 1;
    }

    function createListing(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external nonReentrant returns (uint256) {
        require(price > 0, "Price must be greater than zero");
        
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(nft.isApprovedForAll(msg.sender, address(this)) || nft.getApproved(tokenId) == address(this), "Not approved for transfer");

        uint256 listingId = _listingIds++;

        listings[listingId] = Listing(
            listingId,
            nftContract,
            tokenId,
            payable(msg.sender),
            price,
            ListingStatus.Active
        );

        // Transfer NFT to this contract (Escrow)
        nft.safeTransferFrom(msg.sender, address(this), tokenId);

        emit ListingCreated(listingId, nftContract, tokenId, msg.sender, price);
        return listingId;
    }

    function buy(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.status == ListingStatus.Active, "Listing is not active");
        require(msg.value == listing.price, "Incorrect ETH sent");

        listing.status = ListingStatus.Sold;

        // Calculate royalties if applicable
        uint256 royaltyAmount = 0;
        address royaltyReceiver = address(0);
        
        try IERC2981(listing.nftContract).royaltyInfo(listing.tokenId, listing.price) returns (address receiver, uint256 amount) {
            royaltyReceiver = receiver;
            royaltyAmount = amount;
        } catch {
            // Contract doesn't support ERC2981, do nothing
        }

        // Calculate platform fee
        uint256 platformFee = (listing.price * platformFeeBasisPoints) / 10000;
        
        // Calculate seller net amount
        uint256 sellerAmount = listing.price - platformFee - royaltyAmount;

        // Transfer NFT to buyer
        IERC721(listing.nftContract).safeTransferFrom(address(this), msg.sender, listing.tokenId);

        // Distribute funds
        if (platformFee > 0) {
            (bool success, ) = treasury.call{value: platformFee}("");
            require(success, "Platform fee transfer failed");
        }
        
        if (royaltyAmount > 0 && royaltyReceiver != address(0)) {
            (bool success, ) = payable(royaltyReceiver).call{value: royaltyAmount}("");
            require(success, "Royalty transfer failed");
        }

        (bool sellerSuccess, ) = listing.seller.call{value: sellerAmount}("");
        require(sellerSuccess, "Seller transfer failed");

        emit ListingSold(listingId, msg.sender, listing.price);
    }

    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.status == ListingStatus.Active, "Listing is not active");
        require(listing.seller == msg.sender, "Not the seller");

        listing.status = ListingStatus.Cancelled;

        // Return NFT to seller
        IERC721(listing.nftContract).safeTransferFrom(address(this), msg.sender, listing.tokenId);

        emit ListingCancelled(listingId);
    }

    // Admin functions
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
