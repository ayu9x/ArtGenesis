"use client";
import React, { useState } from "react";
import { Coins, Search, TrendingUp, TrendingDown } from "lucide-react";
import styles from "./page.module.css";

const TOKENS = [
  { rank: 1, name: "Ethereum", symbol: "ETH", price: "$2,012.45", change: "+3.21%", vol: "$14.2B", mcap: "$242B", color: "#627eea", up: true },
  { rank: 2, name: "Polygon", symbol: "MATIC", price: "$0.89", change: "+5.67%", vol: "$890M", mcap: "$8.3B", color: "#8247e5", up: true },
  { rank: 3, name: "Solana", symbol: "SOL", price: "$178.30", change: "-1.42%", vol: "$3.1B", mcap: "$78B", color: "#00ffa3", up: false },
  { rank: 4, name: "Avalanche", symbol: "AVAX", price: "$38.12", change: "+2.89%", vol: "$620M", mcap: "$14B", color: "#e84142", up: true },
  { rank: 5, name: "Arbitrum", symbol: "ARB", price: "$1.24", change: "-0.78%", vol: "$410M", mcap: "$4.8B", color: "#28a0f0", up: false },
  { rank: 6, name: "Optimism", symbol: "OP", price: "$2.67", change: "+4.12%", vol: "$380M", mcap: "$2.9B", color: "#ff0420", up: true },
  { rank: 7, name: "Base", symbol: "BASE", price: "$0.042", change: "+12.5%", vol: "$156M", mcap: "$1.2B", color: "#0052ff", up: true },
  { rank: 8, name: "Chainlink", symbol: "LINK", price: "$15.89", change: "-2.11%", vol: "$720M", mcap: "$9.3B", color: "#2a5ada", up: false },
  { rank: 9, name: "Uniswap", symbol: "UNI", price: "$7.45", change: "+1.34%", vol: "$210M", mcap: "$4.5B", color: "#ff007a", up: true },
  { rank: 10, name: "Aave", symbol: "AAVE", price: "$98.50", change: "+6.78%", vol: "$185M", mcap: "$1.4B", color: "#b6509e", up: true },
  { rank: 11, name: "Immutable X", symbol: "IMX", price: "$2.12", change: "-3.45%", vol: "$142M", mcap: "$2.6B", color: "#00bfff", up: false },
  { rank: 12, name: "ApeCoin", symbol: "APE", price: "$1.78", change: "+0.92%", vol: "$98M", mcap: "$650M", color: "#0041ff", up: true },
];

const FILTERS = ["All", "Layer 1", "Layer 2", "DeFi", "NFT"];

export default function TokensPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = TOKENS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.meshBg} />
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.badge}><Coins size={16} /><span>Market Data</span></div>
          <h1 className={styles.title}>Token <span className={styles.titleAccent}>Explorer</span></h1>
          <p className={styles.subtitle}>Track real-time prices, volume, and market cap of top crypto tokens across all supported chains.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <Search size={18} style={{ color: "var(--text-tertiary)" }} />
            <input placeholder="Search tokens..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className={styles.filterBtns}>
            {FILTERS.map(f => (
              <button key={f} className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>#</span><span>Token</span><span>Price</span><span>24h %</span><span>Volume</span><span>Market Cap</span><span>Trend</span>
          </div>
          {filtered.map(t => (
            <div key={t.rank} className={styles.tableRow}>
              <span className={styles.rank}>{t.rank}</span>
              <div className={styles.tokenInfo}>
                <div className={styles.tokenIcon} style={{ background: t.color }}>{t.symbol.charAt(0)}</div>
                <div>
                  <div className={styles.tokenName}>{t.name}</div>
                  <div className={styles.tokenSymbol}>{t.symbol}</div>
                </div>
              </div>
              <span className={styles.price}>{t.price}</span>
              <span className={t.up ? styles.positive : styles.negative}>{t.change}</span>
              <span className={styles.volume}>{t.vol}</span>
              <span className={styles.mcap}>{t.mcap}</span>
              <div>{t.up ? <TrendingUp size={20} style={{ color: "var(--accent-success)" }} /> : <TrendingDown size={20} style={{ color: "var(--accent-danger)" }} />}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
