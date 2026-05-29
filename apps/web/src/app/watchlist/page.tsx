"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Eye, TrendingUp, TrendingDown, Trash2, ArrowRight, Activity } from "lucide-react";
import styles from "./page.module.css";

const DUMMY_WATCHLIST = [
  {
    id: "1",
    collection: "CyberPunks",
    item: "Punk #4092",
    floorPrice: "2.5 ETH",
    topBid: "2.1 ETH",
    volume24h: "+12.4%",
    isPositive: true,
    imageColor: "linear-gradient(135deg, #FF6B6B 0%, #845EC2 100%)"
  },
  {
    id: "2",
    collection: "Abstract Horizons",
    item: "Horizon #08",
    floorPrice: "0.85 ETH",
    topBid: "0.80 ETH",
    volume24h: "-3.2%",
    isPositive: false,
    imageColor: "linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)"
  },
  {
    id: "3",
    collection: "Neon Dreams",
    item: "Cityscape 2042",
    floorPrice: "4.2 ETH",
    topBid: "4.5 ETH",
    volume24h: "+28.7%",
    isPositive: true,
    imageColor: "linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)"
  },
  {
    id: "4",
    collection: "Ethereal Beings",
    item: "Seraph #112",
    floorPrice: "1.1 ETH",
    topBid: "0.95 ETH",
    volume24h: "+5.1%",
    isPositive: true,
    imageColor: "linear-gradient(135deg, #BFF098 0%, #6FD6FF 100%)"
  },
  {
    id: "5",
    collection: "Genesis Blocks",
    item: "Block #0",
    floorPrice: "10.5 ETH",
    topBid: "8.0 ETH",
    volume24h: "-1.5%",
    isPositive: false,
    imageColor: "linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)"
  }
];

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(DUMMY_WATCHLIST);

  const handleRemove = (id: string) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
  };

  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className={styles.meshBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <Eye size={16} />
            <span>Market Radar</span>
          </div>
          <h1 className={styles.title}>My Watchlist</h1>
          <p className={styles.subtitle}>
            Track your favorite collections and specific NFTs in real-time. Keep an eye on floor prices and bidding activity.
          </p>
        </div>

        {watchlist.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Item Details</th>
                  <th>Floor Price</th>
                  <th>Highest Bid</th>
                  <th>24h Volume</th>
                  <th className={styles.actionsColumn}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((item) => (
                  <tr key={item.id} className={styles.tableRow}>
                    <td>
                      <div className={styles.itemCell}>
                        <div 
                          className={styles.imageThumb} 
                          style={{ background: item.imageColor }} 
                        />
                        <div className={styles.itemInfo}>
                          <span className={styles.itemName}>{item.item}</span>
                          <span className={styles.collectionName}>{item.collection}</span>
                        </div>
                      </div>
                    </td>
                    <td className={styles.priceCell}>{item.floorPrice}</td>
                    <td className={styles.priceCell}>{item.topBid}</td>
                    <td>
                      <div className={`${styles.volumeCell} ${item.isPositive ? styles.positive : styles.negative}`}>
                        {item.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        {item.volume24h}
                      </div>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <Link href="/marketplace" className={styles.viewBtn}>
                          View <ArrowRight size={14} />
                        </Link>
                        <button 
                          className={styles.removeBtn} 
                          onClick={() => handleRemove(item.id)}
                          aria-label="Remove from watchlist"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Activity size={48} />
            </div>
            <h2>Your Watchlist is Empty</h2>
            <p>You aren&apos;t tracking any NFTs yet. Explore the marketplace to find pieces you love.</p>
            <Link href="/marketplace" className={styles.exploreBtn}>
              Explore Marketplace
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
