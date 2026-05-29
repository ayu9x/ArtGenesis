"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Edit2, MoreHorizontal, ChevronDown, Search, Grid, LayoutGrid, List, Eye } from "lucide-react";
import styles from "./page.module.css";

const TABS = ["Galleries", "Items", "Tokens", "Portfolio", "Listings", "Offers", "Created", "Watchlist", "Favorites", "Activity"];
const STATUS_FILTERS = ["All", "Listed", "Not Listed", "Hidden"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Items");
  const [activeStatus, setActiveStatus] = useState("All");

  return (
    <div className={styles.page}>
      <div className={styles.coverWrapper}>
        <div className={styles.coverOverlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.profileInfo}>
            <div className={styles.avatarWrap}>
              <Image src="/nfts/pfp1.png" alt="Avatar" fill className={styles.avatarImg} />
            </div>
            
            <div className={styles.nameRow}>
              <h1 className={styles.name}>ayu9x</h1>
              <div className={styles.actions}>
                <button className={styles.iconBtn}><Edit2 size={16} /></button>
                <button className={styles.iconBtn}><MoreHorizontal size={16} /></button>
              </div>
            </div>
            
            <div className={styles.metaRow}>
              <span className={styles.metaBadge}>Joined May 2026</span>
              <select className={styles.walletSelect}>
                <option>1 Wallet</option>
              </select>
            </div>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>USD VALUE <Eye size={12} /></span>
              <span className={styles.statValue}>$0.00</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>NFTS</span>
              <span className={styles.statValue}>0%</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>TOKENS</span>
              <span className={styles.statValue}>0%</span>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          {TABS.map(tab => (
            <button 
              key={tab} 
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.contentLayout}>
          <div className={styles.sidebar}>
            <div className={styles.filterGroup}>
              <div className={styles.filterHeader}>
                Status <ChevronDown size={16} />
              </div>
              <div className={styles.filterOptions}>
                {STATUS_FILTERS.map(f => (
                  <button 
                    key={f} 
                    className={`${styles.filterPill} ${activeStatus === f ? styles.activePill : ""}`}
                    onClick={() => setActiveStatus(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={styles.filterGroup}>
              <div className={styles.filterHeader}>
                Wallets <ChevronDown size={16} />
              </div>
              <div className={styles.filterOptions}>
                <button className={`${styles.filterPill} ${styles.activePill}`}>All</button>
                <div className={styles.walletFilter}>
                  <div className={styles.walletIcon}></div> 0x3b1b...ed28
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.toolbar}>
              <div className={styles.searchBox}>
                <Search size={16} color="#71717a" />
                <input placeholder="Search for items" />
              </div>
              
              <div className={styles.toolbarRight}>
                <button className={styles.dropdown}>Recently received <ChevronDown size={14} /></button>
                <div className={styles.viewModes}>
                  <button className={`${styles.viewBtn} ${styles.activeView}`}><Grid size={16} /></button>
                  <button className={styles.viewBtn}><LayoutGrid size={16} /></button>
                  <button className={styles.viewBtn}><List size={16} /></button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            <div className={styles.emptyState}>
              <div className={styles.emptyCards}>
                <div className={`${styles.emptyCard} ${styles.emptyCard1}`} />
                <div className={`${styles.emptyCard} ${styles.emptyCard2}`} />
                <div className={`${styles.emptyCard} ${styles.emptyCard3}`}>
                  <Image src="/images/RareNFT.jpg" alt="Preview" fill style={{objectFit: 'cover', borderRadius: 6}} />
                </div>
              </div>
              <h3 className={styles.emptyTitle}>No items found</h3>
              <p className={styles.emptyDesc}>Discover new collections on ArtGenesis</p>
              <button className={styles.primaryBtn}>Go to Discover</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
