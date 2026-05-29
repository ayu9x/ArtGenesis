"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Settings, Share2, Grid, Activity, Heart, Globe, Mail } from "lucide-react";
import styles from "./page.module.css";
import { NFTCard } from "@/components/nft/NFTCard";

const MOCK_NFTS = [
  { id: "1", title: "Genesis Block", image: "/images/RareNFT.jpg", price: "2.5", creator: "Hackatao" },
  { id: "2", title: "Cyber Punk", image: "/images/Mike.jpg", price: "1.2", creator: "Mike" },
  { id: "3", title: "Abstract Horizon", image: "/images/LiveAuction.jpg", price: "0.8", creator: "Reza" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"collected" | "created" | "activity" | "favorites">("collected");

  return (
    <div className={styles.page}>
      {/* Cover Image */}
      <div className={styles.coverWrapper}>
        <Image src="/images/Savana.jpg" alt="Cover" fill className={styles.coverImage} priority />
      </div>

      <div className={styles.container}>
        {/* Profile Info */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <Image src="/images/Hackatao.jpg" alt="Avatar" width={120} height={120} className={styles.avatar} />
          </div>
          
          <div className={styles.profileDetails}>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>Collector42</h1>
              <div className={styles.address}>0x1234...ef01</div>
            </div>
            
            <p className={styles.bio}>Digital art enthusiast and early adopter. Focusing on 1/1 abstract and conceptual pieces across multiple blockchains.</p>
            
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink}><Globe size={18} /> @collector42</a>
              <a href="#" className={styles.socialLink}><Mail size={18} /> contact</a>
            </div>
          </div>
          
          <div className={styles.profileActions}>
            <button className={styles.btnSecondary}><Share2 size={18} /> Share</button>
            <button className={styles.btnSecondary}><Settings size={18} /> Settings</button>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${activeTab === "collected" ? styles.active : ""}`} onClick={() => setActiveTab("collected")}><Grid size={18} /> Collected (12)</button>
          <button className={`${styles.tab} ${activeTab === "created" ? styles.active : ""}`} onClick={() => setActiveTab("created")}><Grid size={18} /> Created (3)</button>
          <button className={`${styles.tab} ${activeTab === "activity" ? styles.active : ""}`} onClick={() => setActiveTab("activity")}><Activity size={18} /> Activity</button>
          <button className={`${styles.tab} ${activeTab === "favorites" ? styles.active : ""}`} onClick={() => setActiveTab("favorites")}><Heart size={18} /> Favorites</button>
        </div>

        {/* Grid Content */}
        <div className={styles.grid}>
          {activeTab !== "activity" && MOCK_NFTS.map(nft => (
            <NFTCard 
              key={nft.id} 
              id={nft.id} 
              title={nft.title} 
              image={nft.image} 
              price={nft.price} 
              creatorName={nft.creator} 
              collection="Genesis"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
