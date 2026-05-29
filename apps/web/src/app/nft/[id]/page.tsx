"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Share2,
  ExternalLink,
  Clock,
  BadgeCheck,
  Eye,
  Tag,
  Activity,
  ShoppingCart,
  ArrowRight,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import styles from "./page.module.css";

// Mock data for the detail page
const NFT_DATA = {
  image: "/images/RareNFT.jpg",
  title: "Genesis Oracle #001",
  description:
    "The Genesis Oracle is the first piece in the ArtGenesis Genesis Collection. This unique digital artwork represents the dawn of a new era in decentralized art curation, blending traditional artistic sensibilities with cutting-edge blockchain technology.",
  collection: "Genesis Collection",
  isVerified: true,
  creator: { name: "Hackatao", avatar: "/images/Hackatao.jpg", address: "0x1234...5678" },
  owner: { name: "Collector42", avatar: "/images/Mike.jpg", address: "0xabcd...ef01" },
  price: "2.45",
  usdPrice: "4,890",
  chain: "Polygon",
  tokenId: "#001",
  tokenStandard: "ERC-721",
  views: 1243,
  favorites: 234,
  properties: [
    { trait: "Background", value: "Cosmic Purple", rarity: "12%" },
    { trait: "Body", value: "Gold Armor", rarity: "5%" },
    { trait: "Eyes", value: "Laser Red", rarity: "8%" },
    { trait: "Weapon", value: "Void Staff", rarity: "3%" },
    { trait: "Aura", value: "Divine Light", rarity: "2%" },
    { trait: "Rarity", value: "Legendary", rarity: "1%" },
  ],
  activity: [
    { type: "Listed", from: "Hackatao", to: "-", price: "2.45 ETH", time: "2 hours ago" },
    { type: "Transfer", from: "0xdead...beef", to: "Hackatao", price: "-", time: "1 day ago" },
    { type: "Minted", from: "-", to: "0xdead...beef", price: "-", time: "3 days ago" },
  ],
};

export default function NFTDetailPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"properties" | "activity" | "details">("properties");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("0x1234567890abcdef");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.imageCard}>
            <div className={styles.imageWrapper}>
              <Image src={NFT_DATA.image} alt={NFT_DATA.title} fill className={styles.nftImage} priority sizes="(max-width: 768px) 100vw, 600px" />
            </div>
            <div className={styles.imageActions}>
              <button className={`${styles.actionBtn} ${isLiked ? styles.liked : ""}`} onClick={() => setIsLiked(!isLiked)}>
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                <span>{NFT_DATA.favorites + (isLiked ? 1 : 0)}</span>
              </button>
              <div className={styles.actionRight}>
                <button className={styles.actionBtn}><Eye size={18} /><span>{NFT_DATA.views}</span></button>
                <button className={styles.actionBtn}><Share2 size={18} /></button>
                <button className={styles.actionBtn}><ExternalLink size={18} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className={styles.infoSection}>
          {/* Collection & Title */}
          <Link href="/collections/genesis" className={styles.collectionLink}>
            {NFT_DATA.collection}
            {NFT_DATA.isVerified && <BadgeCheck size={16} className={styles.verified} />}
          </Link>
          <h1 className={styles.nftTitle}>{NFT_DATA.title}</h1>

          {/* Creator & Owner */}
          <div className={styles.ownerRow}>
            <div className={styles.ownerItem}>
              <Image src={NFT_DATA.creator.avatar} alt={NFT_DATA.creator.name} width={32} height={32} className={styles.ownerAvatar} />
              <div><span className={styles.ownerLabel}>Creator</span><span className={styles.ownerName}>{NFT_DATA.creator.name}</span></div>
            </div>
            <div className={styles.ownerItem}>
              <Image src={NFT_DATA.owner.avatar} alt={NFT_DATA.owner.name} width={32} height={32} className={styles.ownerAvatar} />
              <div><span className={styles.ownerLabel}>Owner</span><span className={styles.ownerName}>{NFT_DATA.owner.name}</span></div>
            </div>
          </div>

          {/* Price Box */}
          <div className={styles.priceBox}>
            <span className={styles.priceLabel}>Current Price</span>
            <div className={styles.priceMain}>
              <span className={styles.ethSymbol}>◆</span>
              <span className={styles.priceValue}>{NFT_DATA.price} ETH</span>
              <span className={styles.usdValue}>(${NFT_DATA.usdPrice})</span>
            </div>
            <div className={styles.priceActions}>
              <button className={styles.buyBtn} id="nft-buy-btn">
                <ShoppingCart size={18} /> Buy Now
              </button>
              <button className={styles.offerBtn} id="nft-offer-btn">
                <Tag size={18} /> Make Offer
              </button>
            </div>
          </div>

          {/* Description */}
          <div className={styles.descSection}>
            <h3>Description</h3>
            <p>{NFT_DATA.description}</p>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {(["properties", "activity", "details"] as const).map((tab) => (
              <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Properties */}
          {activeTab === "properties" && (
            <div className={styles.propertiesGrid}>
              {NFT_DATA.properties.map((p) => (
                <div key={p.trait} className={styles.propertyCard}>
                  <span className={styles.propTrait}>{p.trait}</span>
                  <span className={styles.propValue}>{p.value}</span>
                  <span className={styles.propRarity}>{p.rarity} have this</span>
                </div>
              ))}
            </div>
          )}

          {/* Activity */}
          {activeTab === "activity" && (
            <div className={styles.activityTable}>
              <div className={styles.tableHeader}>
                <span>Event</span><span>From</span><span>To</span><span>Price</span><span>Time</span>
              </div>
              {NFT_DATA.activity.map((a, i) => (
                <div key={i} className={styles.tableRow}>
                  <span className={styles.eventBadge}>{a.type}</span>
                  <span>{a.from}</span><span>{a.to}</span><span>{a.price}</span><span>{a.time}</span>
                </div>
              ))}
            </div>
          )}

          {/* Details */}
          {activeTab === "details" && (
            <div className={styles.detailsList}>
              <div className={styles.detailRow}><span>Contract</span><button className={styles.copyBtn} onClick={handleCopy}>{copied ? <Check size={12}/> : <Copy size={12}/>} 0x1234...abcd</button></div>
              <div className={styles.detailRow}><span>Token ID</span><span>{NFT_DATA.tokenId}</span></div>
              <div className={styles.detailRow}><span>Standard</span><span>{NFT_DATA.tokenStandard}</span></div>
              <div className={styles.detailRow}><span>Chain</span><span>{NFT_DATA.chain}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
