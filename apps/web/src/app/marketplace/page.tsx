"use client";

import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  ChevronDown,
  X,
  Sparkles,
} from "lucide-react";
import { NFTCard } from "@/components/nft/NFTCard";
import styles from "./page.module.css";

// ============ Filter Options ============
const CATEGORIES = ["All", "Art", "Gaming", "PFPs", "Photography", "Music", "Collectibles"];
const CHAINS = ["All Chains", "Polygon", "Ethereum", "Base", "Arbitrum"];
const STATUS_OPTIONS = ["All", "Buy Now", "On Auction", "Has Offers"];
const SORT_OPTIONS = [
  { value: "recently_listed", label: "Recently Listed" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "most_liked", label: "Most Liked" },
  { value: "ending_soon", label: "Ending Soon" },
];

// ============ Mock NFTs ============
const MOCK_NFTS = [
  { id: "m1", image: "/images/RareNFT.jpg", title: "Genesis Oracle #001", collection: "Genesis Collection", isVerified: true, price: "2.45", usdPrice: "4,890", creatorAvatar: "/images/Hackatao.jpg", creatorName: "Hackatao", likes: 234 },
  { id: "m2", image: "/images/LiveAuction.jpg", title: "Cosmic Dreams #147", collection: "Cosmic Series", isVerified: true, price: "1.8", usdPrice: "3,600", creatorAvatar: "/images/Mike.jpg", creatorName: "Mike Parisella", likes: 186 },
  { id: "m3", image: "/images/Savana.jpg", title: "Savanna Spirits", collection: "Nature Art", isVerified: false, price: "0.95", usdPrice: "1,900", creatorAvatar: "/images/Reeza.jpg", creatorName: "Reza Afshar", likes: 142 },
  { id: "m4", image: "/images/Skyborne.png", title: "Skyborne Immortal #42", collection: "Skyborne Genesis", isVerified: true, price: "3.2", usdPrice: "6,400", creatorAvatar: "/images/Tobi.jpg", creatorName: "Tobi Schnorpfeil", likes: 312, isAuction: true, endTime: "2h 15m" },
  { id: "m5", image: "/images/RareNFT.jpg", title: "Neon Samurai #033", collection: "Neon Collection", isVerified: true, price: "1.15", usdPrice: "2,300", creatorAvatar: "/images/Hackatao.jpg", creatorName: "Hackatao", likes: 98 },
  { id: "m6", image: "/images/LiveAuction.jpg", title: "Abstract Realm #99", collection: "Abstract Art", isVerified: false, price: "0.65", usdPrice: "1,300", creatorAvatar: "/images/Mike.jpg", creatorName: "Mike Parisella", likes: 77 },
  { id: "m7", image: "/images/Savana.jpg", title: "Wild Plains #12", collection: "Nature Art", isVerified: false, price: "0.42", usdPrice: "840", creatorAvatar: "/images/Reeza.jpg", creatorName: "Reza Afshar", likes: 56 },
  { id: "m8", image: "/images/Skyborne.png", title: "Sky Guardian #71", collection: "Skyborne Genesis", isVerified: true, price: "2.8", usdPrice: "5,600", creatorAvatar: "/images/Tobi.jpg", creatorName: "Tobi Schnorpfeil", likes: 201, isAuction: true, endTime: "6h 30m" },
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedChain, setSelectedChain] = useState("All Chains");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("recently_listed");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const activeFilters = [
    selectedCategory !== "All" && selectedCategory,
    selectedChain !== "All Chains" && selectedChain,
    selectedStatus !== "All" && selectedStatus,
    priceMin && `Min: ${priceMin} ETH`,
    priceMax && `Max: ${priceMax} ETH`,
  ].filter(Boolean);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedChain("All Chains");
    setSelectedStatus("All");
    setPriceMin("");
    setPriceMax("");
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              <Sparkles size={28} className={styles.titleIcon} />
              Marketplace
            </h1>
            <p className={styles.subtitle}>
              Explore, collect, and sell extraordinary NFTs
            </p>
          </div>

          {/* Search + Controls */}
          <div className={styles.controls}>
            <div className={styles.searchBar}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search NFTs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                id="marketplace-search"
              />
            </div>

            <div className={styles.controlActions}>
              <button
                className={`${styles.filterToggle} ${isFilterOpen ? styles.active : ""}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                id="marketplace-filter-toggle"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              <div className={styles.sortSelect}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.select}
                  id="marketplace-sort"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className={styles.selectChevron} />
              </div>

              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewButton} ${viewMode === "grid" ? styles.viewActive : ""}`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  className={`${styles.viewButton} ${viewMode === "list" ? styles.viewActive : ""}`}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <LayoutList size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className={styles.activeFilters}>
              {activeFilters.map((filter) => (
                <span key={filter as string} className={styles.activeFilterBadge}>
                  {filter as string}
                  <button className={styles.removeFilter}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              <button className={styles.clearAll} onClick={clearFilters}>
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Filter Sidebar */}
        {isFilterOpen && (
          <aside className={styles.filterSidebar}>
            {/* Category */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Category</h4>
              <div className={styles.filterOptions}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`${styles.filterChip} ${selectedCategory === cat ? styles.chipActive : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Status</h4>
              <div className={styles.filterOptions}>
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    className={`${styles.filterChip} ${selectedStatus === status ? styles.chipActive : ""}`}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Chain */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Blockchain</h4>
              <div className={styles.filterOptions}>
                {CHAINS.map((chain) => (
                  <button
                    key={chain}
                    className={`${styles.filterChip} ${selectedChain === chain ? styles.chipActive : ""}`}
                    onClick={() => setSelectedChain(chain)}
                  >
                    {chain}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Price Range</h4>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className={styles.priceInput}
                />
                <span className={styles.priceSeparator}>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className={styles.priceInput}
                />
                <span className={styles.priceCurrency}>ETH</span>
              </div>
            </div>
          </aside>
        )}

        {/* NFT Grid */}
        <div className={styles.resultsArea}>
          <p className={styles.resultsCount}>{MOCK_NFTS.length} items</p>
          <div className={`${styles.nftGrid} ${!isFilterOpen ? styles.nftGridFull : ""}`}>
            {MOCK_NFTS.map((nft) => (
              <NFTCard key={nft.id} {...nft} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
