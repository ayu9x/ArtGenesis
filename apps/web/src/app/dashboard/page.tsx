"use client";

import React from "react";
import { BarChart3, TrendingUp, DollarSign, Package, Settings, ExternalLink } from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Creator Studio</h3>
        </div>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={`${styles.navItem} ${styles.active}`}><BarChart3 size={18} /> Overview</Link>
          <Link href="/collections" className={styles.navItem}><Package size={18} /> My Collections</Link>
          <Link href="/dashboard" className={styles.navItem}><TrendingUp size={18} /> Earnings</Link>
          <Link href="/settings" className={styles.navItem}><Settings size={18} /> Settings</Link>
        </nav>
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <h1>Dashboard Overview</h1>
          <Link href="/create" className={styles.btnPrimary}>Create New NFT</Link>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><DollarSign size={24} className={styles.textAccent} /></div>
            <div>
              <p className={styles.statLabel}>Total Volume</p>
              <h3 className={styles.statValue}>45.2 ETH</h3>
              <p className={styles.statTrend}>+12.5% this month</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Package size={24} className={styles.textAccent} /></div>
            <div>
              <p className={styles.statLabel}>Items Created</p>
              <h3 className={styles.statValue}>124</h3>
              <p className={styles.statTrend}>4 active listings</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><TrendingUp size={24} className={styles.textAccent} /></div>
            <div>
              <p className={styles.statLabel}>Floor Price</p>
              <h3 className={styles.statValue}>0.85 ETH</h3>
              <p className={styles.statTrend}>Genesis Collection</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Recent Activity</h2>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Event</span><span>Item</span><span>Price</span><span>Date</span>
            </div>
            <div className={styles.tableRow}>
              <span>Sale</span><span>Genesis #042</span><span>0.85 ETH</span><span>2 hours ago <ExternalLink size={14} className={styles.linkIcon}/></span>
            </div>
            <div className={styles.tableRow}>
              <span>Listing</span><span>Cyber Punk #01</span><span>1.20 ETH</span><span>5 hours ago <ExternalLink size={14} className={styles.linkIcon}/></span>
            </div>
            <div className={styles.tableRow}>
              <span>Mint</span><span>Abstract #09</span><span>-</span><span>1 day ago <ExternalLink size={14} className={styles.linkIcon}/></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
