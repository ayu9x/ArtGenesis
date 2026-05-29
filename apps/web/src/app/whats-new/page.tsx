"use client";
import React from "react";
import { Sparkles, Rocket, Bug } from "lucide-react";
import styles from "./page.module.css";

const UPDATES = [
  { id: 1, type: "feature", title: "Smart Contract Wallets (Account Abstraction)", date: "May 25, 2026", desc: "We've fully integrated ERC-4337. You can now create a wallet with just an email, enjoy gasless transactions on Layer 2s, and set up daily spending limits." },
  { id: 2, type: "feature", title: "Creator Studio V2", date: "May 18, 2026", desc: "A massive overhaul to our creator tools. You can now manage your drops, view detailed analytics on unique owners, and set up dynamic metadata directly from the dashboard." },
  { id: 3, type: "fix", title: "Marketplace Performance Boost", date: "May 10, 2026", desc: "Rewrote our indexing engine. Pages now load 3x faster, and new listings appear on the marketplace in under 2 seconds." },
  { id: 4, type: "feature", title: "Cross-chain Swaps", date: "April 28, 2026", desc: "You can now buy an NFT on Polygon using ETH on Mainnet. Our built-in swap engine handles the bridging and conversion automatically at checkout." },
];

export default function WhatsNewPage() {
  return (
    <div className={styles.page}>
      <div className={styles.meshBg} />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>What's New</h1>
          <p className={styles.subtitle}>Stay up to date with the latest features, improvements, and fixes on ArtGenesis.</p>
        </div>

        <div className={styles.timeline}>
          {UPDATES.map(update => (
            <div key={update.id} className={styles.updateCard}>
              <div className={styles.updateIcon}>
                {update.type === "feature" && <Rocket size={20} color="#8b5cf6" />}
                {update.type === "fix" && <Bug size={20} color="#22c55e" />}
              </div>
              <div className={styles.updateContent}>
                <div className={styles.updateHeader}>
                  <div className={styles.updateBadge}>
                    {update.type === "feature" ? "New Feature" : "Improvement"}
                  </div>
                  <div className={styles.updateDate}>{update.date}</div>
                </div>
                <h3 className={styles.updateTitle}>{update.title}</h3>
                <p className={styles.updateDesc}>{update.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
