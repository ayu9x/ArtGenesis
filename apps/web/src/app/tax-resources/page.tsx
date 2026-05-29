"use client";
import React from "react";
import Link from "next/link";
import { Search, Download, Calculator, FileCheck, FileText, ChevronRight } from "lucide-react";
import styles from "../resources.module.css";

export default function TaxResourcesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.meshBg} />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Tax Resources</h1>
          <p className={styles.subtitle}>Everything you need to understand NFT taxation, calculate your crypto gains, and download your transaction history for tax filing.</p>
          <div className={styles.searchBox}>
            <Search size={20} color="var(--text-tertiary)" />
            <input placeholder="Search tax articles..." />
          </div>
        </div>

        <div className={styles.grid}>
          <Link href="#" className={styles.card}>
            <div className={styles.iconWrap}><Download size={24} /></div>
            <h3 className={styles.cardTitle}>Download Reports</h3>
            <p className={styles.cardDesc}>Export your full ArtGenesis transaction history, including purchases, sales, and gas fees paid in CSV format.</p>
            <span className={styles.cardLink}>Export history <ChevronRight size={14} /></span>
          </Link>
          <Link href="#" className={styles.card}>
            <div className={styles.iconWrap}><Calculator size={24} /></div>
            <h3 className={styles.cardTitle}>Tax Calculators</h3>
            <p className={styles.cardDesc}>We've partnered with top crypto tax software providers. Sync your account directly to calculate your capital gains automatically.</p>
            <span className={styles.cardLink}>View partners <ChevronRight size={14} /></span>
          </Link>
          <Link href="#" className={styles.card}>
            <div className={styles.iconWrap}><FileCheck size={24} /></div>
            <h3 className={styles.cardTitle}>Tax Guides (US & EU)</h3>
            <p className={styles.cardDesc}>Educational resources on how NFTs are taxed in major jurisdictions. Learn about capital gains, income tax, and wash sales.</p>
            <span className={styles.cardLink}>Read guides <ChevronRight size={14} /></span>
          </Link>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Helpful Articles</h2>
          <div className={styles.articleList}>
            <Link href="#" className={styles.articleRow}>
              <div className={styles.articleInfo}>
                <FileText size={20} className={styles.articleIcon} />
                <div>
                  <div className={styles.articleName}>Do I owe taxes when I buy an NFT with Ethereum?</div>
                  <div className={styles.articleMeta}>Tax Basics • 5 min read</div>
                </div>
              </div>
              <ChevronRight size={20} className={styles.articleArrow} />
            </Link>
            <Link href="#" className={styles.articleRow}>
              <div className={styles.articleInfo}>
                <FileText size={20} className={styles.articleIcon} />
                <div>
                  <div className={styles.articleName}>How creators should report NFT sales and royalty income</div>
                  <div className={styles.articleMeta}>Creator Guides • 8 min read</div>
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
