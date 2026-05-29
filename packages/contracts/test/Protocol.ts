import { expect } from "chai";
import { ethers } from "hardhat";
import { ArtGenesisNFT, Treasury, Marketplace, Auction } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("ArtGenesis Protocol", function () {
  let nft: ArtGenesisNFT;
  let treasury: Treasury;
  let marketplace: Marketplace;
  let auction: Auction;

  let owner: HardhatEthersSigner;
  let creator: HardhatEthersSigner;
  let buyer: HardhatEthersSigner;
  let bidder: HardhatEthersSigner;

  const PLATFORM_FEE = 250; // 2.5%
  const ROYALTY_FEE = 1000; // 10%
  const TOKEN_URI = "ipfs://QmTest";
  const LISTING_PRICE = ethers.parseEther("1.0");

  beforeEach(async function () {
    [owner, creator, buyer, bidder] = await ethers.getSigners();

    // Deploy Treasury
    const TreasuryFactory = await ethers.getContractFactory("Treasury");
    treasury = await TreasuryFactory.deploy();

    // Deploy NFT
    const NFTFactory = await ethers.getContractFactory("ArtGenesisNFT");
    nft = await NFTFactory.deploy();

    // Deploy Marketplace
    const MarketplaceFactory = await ethers.getContractFactory("Marketplace");
    marketplace = await MarketplaceFactory.deploy(PLATFORM_FEE, await treasury.getAddress());

    // Deploy Auction
    const AuctionFactory = await ethers.getContractFactory("Auction");
    auction = await AuctionFactory.deploy(PLATFORM_FEE, await treasury.getAddress());
  });

  describe("ArtGenesisNFT", function () {
    it("Should mint an NFT and set royalties", async function () {
      await nft.connect(creator).mint(TOKEN_URI, creator.address, ROYALTY_FEE);
      
      expect(await nft.ownerOf(1)).to.equal(creator.address);
      expect(await nft.tokenURI(1)).to.equal(TOKEN_URI);

      const [receiver, amount] = await nft.royaltyInfo(1, LISTING_PRICE);
      expect(receiver).to.equal(creator.address);
      expect(amount).to.equal(ethers.parseEther("0.1")); // 10% of 1.0
    });
  });

  describe("Marketplace", function () {
    beforeEach(async function () {
      await nft.connect(creator).mint(TOKEN_URI, creator.address, ROYALTY_FEE);
    });

    it("Should create a listing", async function () {
      await nft.connect(creator).approve(await marketplace.getAddress(), 1);
      
      await expect(
        marketplace.connect(creator).createListing(await nft.getAddress(), 1, LISTING_PRICE)
      ).to.emit(marketplace, "ListingCreated");

      const listing = await marketplace.listings(1);
      expect(listing.status).to.equal(0n); // Active
      expect(await nft.ownerOf(1)).to.equal(await marketplace.getAddress());
    });

    it("Should execute a sale, pay royalty and platform fee", async function () {
      await nft.connect(creator).approve(await marketplace.getAddress(), 1);
      await marketplace.connect(creator).createListing(await nft.getAddress(), 1, LISTING_PRICE);

      const treasuryAddress = await treasury.getAddress();
      const initialTreasuryBalance = await ethers.provider.getBalance(treasuryAddress);
      const initialCreatorBalance = await ethers.provider.getBalance(creator.address);

      await marketplace.connect(buyer).buy(1, { value: LISTING_PRICE });

      // Verify NFT transfer
      expect(await nft.ownerOf(1)).to.equal(buyer.address);

      // Verify Treasury (Platform Fee: 2.5% of 1.0 = 0.025 ETH)
      const expectedFee = ethers.parseEther("0.025");
      const finalTreasuryBalance = await ethers.provider.getBalance(treasuryAddress);
      expect(finalTreasuryBalance - initialTreasuryBalance).to.equal(expectedFee);

      // Verify Creator gets remaining + royalty (97.5% - royalty) + royalty = 97.5%
      // 1.0 - 0.025 (Platform) = 0.975 ETH total to creator (since creator is also seller)
    });
  });
});
