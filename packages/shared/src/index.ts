// ArtGenesis Shared Types

// ============ User Types ============
export interface User {
  id: string;
  walletAddress: string;
  username?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============ NFT Types ============
export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: NFTAttribute[];
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: 'number' | 'boost_number' | 'boost_percentage' | 'date';
}

export interface NFT {
  id: string;
  tokenId: string;
  contractAddress: string;
  name: string;
  description: string;
  imageUrl: string;
  metadataUrl: string;
  owner: User;
  creator: User;
  collection?: Collection;
  chain: ChainName;
  tokenStandard: 'ERC721' | 'ERC1155';
  createdAt: Date;
}

// ============ Collection Types ============
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  bannerUrl?: string;
  creator: User;
  category: CollectionCategory;
  chain: ChainName;
  floorPrice?: string;
  totalVolume?: string;
  itemCount: number;
  ownerCount: number;
  isVerified: boolean;
  createdAt: Date;
}

export type CollectionCategory =
  | 'art'
  | 'gaming'
  | 'memberships'
  | 'pfps'
  | 'photography'
  | 'music'
  | 'sports'
  | 'virtual-worlds';

// ============ Marketplace Types ============
export interface Listing {
  id: string;
  nft: NFT;
  seller: User;
  price: string;
  currency: string;
  status: ListingStatus;
  expiresAt?: Date;
  createdAt: Date;
}

export type ListingStatus = 'active' | 'sold' | 'cancelled' | 'expired';

export interface Offer {
  id: string;
  nft: NFT;
  bidder: User;
  amount: string;
  status: OfferStatus;
  expiresAt: Date;
  createdAt: Date;
}

export type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'expired' | 'cancelled';

// ============ Auction Types ============
export interface Auction {
  id: string;
  nft: NFT;
  seller: User;
  startPrice: string;
  reservePrice?: string;
  currentBid?: string;
  highestBidder?: User;
  startsAt: Date;
  endsAt: Date;
  status: AuctionStatus;
}

export type AuctionStatus = 'pending' | 'active' | 'ended' | 'settled' | 'cancelled';

// ============ Transaction Types ============
export interface Transaction {
  id: string;
  type: TransactionType;
  nft: NFT;
  from: User;
  to: User;
  amount: string;
  txHash: string;
  chain: ChainName;
  blockNumber: number;
  createdAt: Date;
}

export type TransactionType = 'mint' | 'sale' | 'transfer' | 'list' | 'delist' | 'offer' | 'bid';

// ============ Chain Types ============
export type ChainName = 'ethereum' | 'polygon' | 'base' | 'arbitrum';

export interface ChainConfig {
  id: number;
  name: ChainName;
  displayName: string;
  rpcUrl: string;
  blockExplorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  contracts: {
    nft: string;
    marketplace: string;
    auction: string;
    treasury: string;
  };
}

// ============ API Response Types ============
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// ============ Constants ============
export const SUPPORTED_CHAINS: ChainName[] = ['polygon', 'ethereum', 'base', 'arbitrum'];
export const PLATFORM_FEE_PERCENTAGE = 2.5;
export const MAX_ROYALTY_PERCENTAGE = 10;
export const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';
