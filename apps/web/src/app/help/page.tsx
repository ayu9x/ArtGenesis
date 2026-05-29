"use client";
import React from "react";
import Link from "next/link";
import { Search, HelpCircle, ShieldAlert, MessageCircle, FileText, ChevronRight } from "lucide-react";
import styles from "../resources.module.css";

export default function HelpPage() {
  return (
    <div className={styles.page}>
      <div className={styles.meshBg} />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Help Center</h1>
          <p className={styles.subtitle}>How can we help you today? Find answers, troubleshooting guides, and get in touch with our support team.</p>
          <div className={styles.searchBox}>
            <Search size={20} color="var(--text-tertiary)" />
            <input placeholder="Search for help articles..." />
          </div>
        </div>

        <div className={styles.grid}>
          <Link href="#" className={styles.card}>
            <div className={styles.iconWrap}><HelpCircle size={24} /></div>
            <h3 className={styles.cardTitle}>Getting Started</h3>
            <p className={styles.cardDesc}>Learn how to create an account, connect your wallet, and buy or sell your first NFT on the platform.</p>
            <span className={styles.cardLink}>View articles <ChevronRight size={14} /></span>
          </Link>
          <Link href="#" className={styles.card}>
            <div className={styles.iconWrap}><ShieldAlert size={24} /></div>
            <h3 className={styles.cardTitle}>Trust & Safety</h3>
            <p className={styles.cardDesc}>Information on keeping your account secure, avoiding scams, and how to report suspicious activity.</p>
            <span className={styles.cardLink}>View articles <ChevronRight size={14} /></span>
          </Link>
          <Link href="#" className={styles.card}>
            <div className={styles.iconWrap}><MessageCircle size={24} /></div>
            <h3 className={styles.cardTitle}>Contact Support</h3>
            <p className={styles.cardDesc}>Can't find what you're looking for? Reach out to our 24/7 customer support team for assistance.</p>
            <span className={styles.cardLink}>Submit a ticket <ChevronRight size={14} /></span>
          </Link>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.articleList}>
            <Link href="#" className={styles.articleRow}>
              <div className={styles.articleInfo}>
                <FileText size={20} className={styles.articleIcon} />
                <div>
                  <div className={styles.articleName}>Why did my transaction fail?</div>
                  <div className={styles.articleMeta}>Troubleshooting • Updated 2 days ago</div>
                </div>
              </div>
              <ChevronRight size={20} className={styles.articleArrow} />
            </Link>
            <Link href="#" className={styles.articleRow}>
              <div className={styles.articleInfo}>
                <FileText size={20} className={styles.articleIcon} />
                <div>
                  <div className={styles.articleName}>How do I change my primary connected wallet?</div>
                  <div className={styles.articleMeta}>Account Management • Updated 1 week ago</div>
                </div>
              </div>
              <ChevronRight size={20} className={styles.articleArrow} />
            </Link>
            <Link href="#" className={styles.articleRow}>
              <div className={styles.articleInfo}>
                <FileText size={20} className={styles.articleIcon} />
                <div>
                  <div className={styles.articleName}>What are platform fees and creator earnings?</div>
                  <div className={styles.articleMeta}>Buying & Selling • Updated 1 month ago</div>
                </div>
              </div>
              <ChevronRight size={20} className={styles.articleArrow} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
