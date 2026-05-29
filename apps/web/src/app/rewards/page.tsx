"use client";
import React from "react";
import { Trophy, Star, Target, Sparkles, Zap, Flame } from "lucide-react";
import styles from "./page.module.css";

const QUESTS = [
  { id: 1, title: "First Purchase", desc: "Buy your first NFT on ArtGenesis", reward: 500, icon: <ShoppingCart /> },
  { id: 2, title: "List an Item", desc: "List an NFT for sale", reward: 250, icon: <Tag /> },
  { id: 3, title: "Daily Login", desc: "Visit the marketplace today", reward: 50, icon: <Flame /> },
  { id: 4, title: "Make an Offer", desc: "Place a bid on any item", reward: 100, icon: <Zap /> },
];

function ShoppingCart() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>; }
function Tag() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>; }

export default function RewardsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.meshBg} />
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.badge}><Trophy size={16} /><span>Collector Rewards</span></div>
          <h1 className={styles.title}>Earn <span className={styles.titleAccent}>Points & Perks</span></h1>
          <p className={styles.subtitle}>Complete quests, level up your profile, and earn Genesis Points to unlock exclusive marketplace discounts.</p>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Star size={24} /></div>
            <div className={styles.statValue}>1,250</div>
            <div className={styles.statLabel}>Total Points</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Target size={24} /></div>
            <div className={styles.statValue}>Level 4</div>
            <div className={styles.statLabel}>Current Rank</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Sparkles size={24} /></div>
            <div className={styles.statValue}>5%</div>
            <div className={styles.statLabel}>Fee Discount</div>
          </div>
        </div>

        <div className={styles.questsSection}>
          <h2 className={styles.questsTitle}>Active Quests</h2>
          <div className={styles.questList}>
            {QUESTS.map(q => (
              <div key={q.id} className={styles.questItem}>
                <div className={styles.questInfo}>
                  <div className={styles.questIconWrap}>{q.icon}</div>
                  <div>
                    <div className={styles.questName}>{q.title}</div>
                    <div className={styles.questDesc}>{q.desc}</div>
                  </div>
                </div>
                <div className={styles.questAction}>
                  <div className={styles.questReward}>+{q.reward} pts</div>
                  <button className={styles.questBtn}>Go</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
