"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, BarChart3, Users, Wallet, Eye, ArrowUpRight, Activity } from "lucide-react";
import styles from "./page.module.css";

export default function StudioPage() {
  return (
    <div className={styles.page}>
      <div className={styles.meshBg} />
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Creator Studio</h1>
            <p className={styles.subtitle}>Manage your collections, track analytics, and drop new NFTs.</p>
          </div>
          <Link href="/create" className={styles.createBtn}>
            <Plus size={18} /> Create New
          </Link>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Volume <BarChart3 size={16} /></div>
            <div className={styles.statValue}>14.2 ETH</div>
            <div className={`${styles.statTrend} ${styles.trendUp}`}><ArrowUpRight size={14} /> +2.4% this month</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Sales <Wallet size={16} /></div>
            <div className={styles.statValue}>89</div>
            <div className={`${styles.statTrend} ${styles.trendUp}`}><ArrowUpRight size={14} /> +12 this month</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Unique Owners <Users size={16} /></div>
            <div className={styles.statValue}>45</div>
            <div className={`${styles.statTrend} ${styles.trendUp}`}><ArrowUpRight size={14} /> +3 this month</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Profile Views <Eye size={16} /></div>
            <div className={styles.statValue}>1,204</div>
            <div className={`${styles.statTrend} ${styles.trendDown}`}><Activity size={14} /> -5% this month</div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Recent Items</h2>
              <Link href="#" className={styles.panelLink}>View All</Link>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Views</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.itemCell}>
                      <div className={styles.itemThumb}><Image src="/nfts/pfp1.png" alt="Ape" fill className={styles.itemImg} /></div>
                      Cyber Ape #8991
                    </div>
                  </td>
                  <td><span className={`${styles.statusBadge} ${styles.statusActive}`}>Listed</span></td>
                  <td>5.5 ETH</td>
                  <td>342</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.itemCell}>
                      <div className={styles.itemThumb}><Image src="/nfts/music1.png" alt="Music" fill className={styles.itemImg} /></div>
                      Synthwave Nights
                    </div>
                  </td>
                  <td><span className={`${styles.statusBadge} ${styles.statusActive}`}>Listed</span></td>
                  <td>0.5 ETH</td>
                  <td>128</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.itemCell}>
                      <div className={styles.itemThumb}><Image src="/nfts/gaming2.png" alt="Gaming" fill className={styles.itemImg} /></div>
                      Iron Titan MK-IX
                    </div>
                  </td>
                  <td><span className={`${styles.statusBadge} ${styles.statusDraft}`}>Draft</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Recent Activity</h2>
            </div>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <div className={styles.actIcon}><Wallet size={14} /></div>
                <div className={styles.actDetails}>
                  <div className={styles.actText}><strong>whale0x</strong> bought Cyber Ape #8991</div>
                  <div className={styles.actTime}>2 hours ago</div>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.actIcon}><Eye size={14} /></div>
                <div className={styles.actDetails}>
                  <div className={styles.actText}>Your collection <strong>CyberApes</strong> is trending</div>
                  <div className={styles.actTime}>1 day ago</div>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.actIcon}><Activity size={14} /></div>
                <div className={styles.actDetails}>
                  <div className={styles.actText}>Minted <strong>Synthwave Nights</strong></div>
                  <div className={styles.actTime}>3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
