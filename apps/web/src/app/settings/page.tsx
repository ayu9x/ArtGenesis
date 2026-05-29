"use client";

import React from "react";
import { User, Bell, Shield, Wallet, Link as LinkIcon, Save } from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Settings</h3>
        </div>
        <nav className={styles.nav}>
          <Link href="/settings" className={`${styles.navItem} ${styles.active}`}><User size={18} /> Profile</Link>
          <Link href="/settings" className={styles.navItem}><Bell size={18} /> Notifications</Link>
          <Link href="/settings" className={styles.navItem}><Shield size={18} /> Security</Link>
          <Link href="/settings" className={styles.navItem}><Wallet size={18} /> Wallets</Link>
          <Link href="/settings" className={styles.navItem}><LinkIcon size={18} /> Connected Apps</Link>
        </nav>
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <h1>Profile Settings</h1>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input type="text" className={styles.input} placeholder="collector42" defaultValue="collector42" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Bio</label>
            <textarea className={styles.textarea} placeholder="Tell the world your story..." rows={4} defaultValue="Digital art enthusiast and early adopter."></textarea>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input type="email" className={styles.input} placeholder="your@email.com" />
            <p className={styles.hint}>Used for notifications only. Not displayed publicly.</p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Social Links</label>
            <div className={styles.inputWithPrefix}>
              <span className={styles.prefix}>twitter.com/</span>
              <input type="text" className={styles.input} placeholder="username" />
            </div>
            <div className={styles.inputWithPrefix} style={{ marginTop: '0.75rem' }}>
              <span className={styles.prefix}>instagram.com/</span>
              <input type="text" className={styles.input} placeholder="username" />
            </div>
          </div>

          <button className={styles.btnPrimary}><Save size={18} /> Save Changes</button>
        </div>
      </div>
    </div>
  );
}
