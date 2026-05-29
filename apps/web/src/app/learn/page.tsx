"use client";
import React from "react";
import Link from "next/link";
import { Search, BookOpen, GraduationCap, Compass, FileText, ChevronRight } from "lucide-react";
import styles from "../resources.module.css";

export default function LearnPage() {
  return (
    <div className={styles.page}>
      <div className={styles.meshBg} />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Learn Web3 & NFTs</h1>
          <p className={styles.subtitle}>Your comprehensive guide to understanding digital ownership, blockchain technology, and the ArtGenesis ecosystem.</p>
          <div className={styles.searchBox}>
            <Search size={20} color="var(--text-tertiary)" />
            <input placeholder="Search guides, tutorials, and terms..." />
          </div>
        </div>

        <div className={styles.grid}>
          <Link href="#" className={styles.card}>
            <div className={styles.iconWrap}><Compass size={24} /></div>
            <h3 className={styles.cardTitle}>Crypto Basics</h3>
            <p className={styles.cardDesc}>New to crypto? Start here. Learn what a blockchain is, how wallets work, and how to stay secure.</p>
            <span className={styles.cardLink}>Read guide <ChevronRight size={14} /></span>
          </Link>
          <Link href="#" className={styles.card}>
            <div className={styles.iconWrap}><BookOpen size={24} /></div>
            <h3 className={styles.cardTitle}>What is an NFT?</h3>
            <p className={styles.cardDesc}>Dive deep into Non-Fungible Tokens, how they prove ownership, and why they matter for digital art.</p>
            <span className={styles.cardLink}>Read guide <ChevronRight size={14} /></span>
          </Link>
          <Link href="#" className={styles.card}>
            <div className={styles.iconWrap}><GraduationCap size={24} /></div>
            <h3 className={styles.cardTitle}>Creator Academy</h3>
            <p className={styles.cardDesc}>Learn how to mint, market, and manage your NFT collections to build a thriving community.</p>
            <span className={styles.cardLink}>Enter academy <ChevronRight size={14} /></span>
          </Link>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Featured Articles</h2>
          <div className={styles.articleList}>
            <Link href="#" className={styles.articleRow}>
              <div className={styles.articleInfo}>
                <FileText size={20} className={styles.articleIcon} />
                <div>
                  <div className={styles.articleName}>How to set up your first Web3 wallet (MetaMask)</div>
                  <div className={styles.articleMeta}>5 min read • Beginner</div>
                </div>
              </div>
              <ChevronRight size={20} className={styles.articleArrow} />
            </Link>
            <Link href="#" className={styles.articleRow}>
              <div className={styles.articleInfo}>
                <FileText size={20} className={styles.articleIcon} />
                <div>
                  <div className={styles.articleName}>Understanding Gas Fees and how to save money on transactions</div>
                  <div className={styles.articleMeta}>8 min read • Intermediate</div>
                </div>
              </div>
              <ChevronRight size={20} className={styles.articleArrow} />
            </Link>
            <Link href="#" className={styles.articleRow}>
              <div className={styles.articleInfo}>
                <FileText size={20} className={styles.articleIcon} />
                <div>
                  <div className={styles.articleName}>The ultimate guide to smart contract security</div>
                  <div className={styles.articleMeta}>15 min read • Advanced</div>
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
