import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const PLATFORM_FEE = 250; // 2.5%

  // 1. Deploy Treasury
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy();
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log(`Treasury deployed to: ${treasuryAddress}`);

  // 2. Deploy NFT
  const NFT = await ethers.getContractFactory("ArtGenesisNFT");
  const nft = await NFT.deploy();
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log(`ArtGenesisNFT deployed to: ${nftAddress}`);

  // 3. Deploy Marketplace
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(PLATFORM_FEE, treasuryAddress);
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log(`Marketplace deployed to: ${marketplaceAddress}`);

  // 4. Deploy Auction
  const Auction = await ethers.getContractFactory("Auction");
  const auction = await Auction.deploy(PLATFORM_FEE, treasuryAddress);
  await auction.waitForDeployment();
  const auctionAddress = await auction.getAddress();
  console.log(`Auction deployed to: ${auctionAddress}`);

  console.log("\n--- Deployment Complete ---");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
