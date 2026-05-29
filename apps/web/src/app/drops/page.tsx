"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import styles from "./page.module.css";

const DROPS = [
  { id: 1, title: "Cybernetic Evolution", collection: "CyberApes", image: "/nfts/pfp1.png", status: "live", mintPrice: "0.5 ETH", total: 1000, minted: 850, date: "Live Now" },
  { id: 2, title: "Neo Hacker Access Pass", collection: "Neo Hackers", image: "/nfts/pfp2.png", status: "upcoming", mintPrice: "0.2 ETH", total: 5000, minted: 0, date: "Tomorrow, 2PM UTC", timer: { h: 22, m: 15, s: 40 } },
  { id: 3, title: "Legendary Weapons", collection: "DungeonForge", image: "/nfts/gaming1.png", status: "upcoming", mintPrice: "1.0 ETH", total: 100, minted: 0, date: "June 5th, 2026", timer: { h: 142, m: 0, s: 0 } },
  { id: 4, title: "Synthwave Genesis", collection: "Audio Arts", image: "/nfts/music1.png", status: "ended", mintPrice: "0.1 ETH", total: 500, minted: 500, date: "Ended May 20th" },
];

export default function DropsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" 
    ? DROPS 
    : DROPS.filter(d => d.status === activeTab);

  return (
    <div className={styles.page}>
      <div className={styles.meshBg} />
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.badge}><Calendar size={16} /><span>NFT Drops</span></div>
          <h1 className={styles.title}>Upcoming & <span className={styles.titleAccent}>Live Drops</span></h1>
          <p className={styles.subtitle}>Discover the most anticipated NFT collections minting on ArtGenesis.</p>
        </div>

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${activeTab === "all" ? styles.tabActive : ""}`} onClick={() => setActiveTab("all")}>All Drops</button>
          <button className={`${styles.tab} ${activeTab === "live" ? styles.tabActive : ""}`} onClick={() => setActiveTab("live")}>Live Now</button>
          <button className={`${styles.tab} ${activeTab === "upcoming" ? styles.tabActive : ""}`} onClick={() => setActiveTab("upcoming")}>Upcoming</button>
          <button className={`${styles.tab} ${activeTab === "ended" ? styles.tabActive : ""}`} onClick={() => setActiveTab("ended")}>Ended</button>
        </div>

        <div className={styles.grid}>
          {filtered.map(drop => (
            <div key={drop.id} className={styles.card}>
              <div className={styles.cardImage}>
                <Image src={drop.image} alt={drop.title} fill className={styles.cardImg} />
                {drop.status === "live" && <div className={styles.liveBadge}><span className={styles.liveDot} /> Live Minting</div>}
                {drop.status === "upcoming" && <div className={styles.upcomingBadge}>Upcoming</div>}
                {drop.status === "ended" && <div className={styles.endedBadge}>Sold Out</div>}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardCollection}>{drop.collection}</div>
                <h3 className={styles.cardName}>{drop.title}</h3>
                
                <div className={styles.cardMeta}>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Mint Price</div>
                    <div className={styles.metaValue}>{drop.mintPrice}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Supply</div>
                    <div className={styles.metaValue}>{drop.total}</div>
                  </div>
                </div>

                {drop.status === "live" && (
                  <>
                    <div className={styles.progressText}>{drop.minted} / {drop.total} Minted</div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${(drop.minted/drop.total)*100}%` }} />
                    </div>
                    <button className={styles.mintBtn}>Mint Now</button>
                  </>
                )}

                {drop.status === "upcoming" && drop.timer && (
                  <>
                    <div className={styles.countdown}>
                      <div className={styles.countUnit}><div className={styles.countValue}>{drop.timer.h}</div><div className={styles.countLabel}>Hrs</div></div>
                      <div className={styles.countUnit}><div className={styles.countValue}>{drop.timer.m}</div><div className={styles.countLabel}>Min</div></div>
                      <div className={styles.countUnit}><div className={styles.countValue}>{drop.timer.s}</div><div className={styles.countLabel}>Sec</div></div>
                    </div>
                    <button className={`${styles.mintBtn} ${styles.mintBtnDisabled}`}>Remind Me</button>
                  </>
                )}

                {drop.status === "ended" && (
                  <button className={`${styles.mintBtn} ${styles.mintBtnDisabled}`}>View Collection</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
