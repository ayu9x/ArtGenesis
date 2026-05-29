"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Tag, ArrowRightLeft, Sparkles, Hand } from "lucide-react";
import styles from "./page.module.css";

const MOCK_ACTIVITY = [
  { id: 1, type: "sale", event: "Sale", item: "Cyber Ape #8991", collection: "CyberApes", image: "/nfts/pfp1.png", price: "5.5 ETH", from: "ApeCreator", to: "ayu9x", time: "2 mins ago" },
  { id: 2, type: "list", event: "List", item: "Runesword of Eternity", collection: "Legendary Loot", image: "/nfts/gaming1.png", price: "4.2 ETH", from: "DungeonForge", to: "-", time: "15 mins ago" },
  { id: 3, type: "transfer", event: "Transfer", item: "Neo Hacker #042", collection: "Neo Hackers", image: "/nfts/pfp2.png", price: "-", from: "Hackatao", to: "ayu9x", time: "1 hour ago" },
  { id: 4, type: "offer", event: "Offer", item: "Genesis Oracle #001", collection: "Genesis Collection", image: "/images/RareNFT.jpg", price: "2.1 ETH", from: "collector42", to: "-", time: "3 hours ago" },
  { id: 5, type: "mint", event: "Mint", item: "Synthwave Nights EP", collection: "Audio Genesis", image: "/nfts/music1.png", price: "0.5 ETH", from: "NullAddress", to: "DJ Cyber", time: "5 hours ago" },
  { id: 6, type: "sale", event: "Sale", item: "Neon Nights in Neo-Tokyo", collection: "Urban Exploration", image: "/nfts/photo1.png", price: "1.2 ETH", from: "StreetWalker", to: "whale0x", time: "12 hours ago" },
];

const FILTERS = ["All", "Sales", "Listings", "Offers", "Transfers", "Mints"];

export default function ActivityPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const getIcon = (type: string) => {
    switch(type) {
      case "sale": return <ShoppingCart size={14} />;
      case "list": return <Tag size={14} />;
      case "transfer": return <ArrowRightLeft size={14} />;
      case "mint": return <Sparkles size={14} />;
      case "offer": return <Hand size={14} />;
      default: return <Tag size={14} />;
    }
  };

  const filtered = activeFilter === "All" 
    ? MOCK_ACTIVITY 
    : MOCK_ACTIVITY.filter(a => a.event === activeFilter.slice(0, -1) || a.event === activeFilter); // Simple plural matching

  return (
    <div className={styles.page}>
      <div className={styles.meshBg} />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Marketplace Activity</h1>
          <p className={styles.subtitle}>Watch live trades, listings, and offers across the ArtGenesis platform.</p>
        </div>

        <div className={styles.filters}>
          {FILTERS.map(f => (
            <button key={f} className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ""}`} onClick={() => setActiveFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className={styles.activityTable}>
          {filtered.map(item => (
            <div key={item.id} className={`${styles.tableRow} ${styles[item.type]}`}>
              <div className={styles.eventType}>
                <div className={styles.eventIcon}>{getIcon(item.type)}</div>
                <span>{item.event}</span>
              </div>
              
              <div className={styles.itemInfo}>
                <div className={styles.itemImageWrap}>
                  <Image src={item.image} alt={item.item} fill className={styles.itemImage} />
                </div>
                <div>
                  <div className={styles.itemName}>{item.item}</div>
                  <div className={styles.itemCollection}>{item.collection}</div>
                </div>
              </div>

              <div className={styles.price}>{item.price}</div>
              <div><Link href="#" className={styles.userLink}>{item.from}</Link></div>
              <div>{item.to !== "-" ? <Link href="#" className={styles.userLink}>{item.to}</Link> : "-"}</div>
              <div className={styles.time}>{item.time}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
