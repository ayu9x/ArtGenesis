"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Grid, Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import styles from "./page.module.css";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFavorites = favorites.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.collection.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className={styles.meshBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <Heart size={16} fill="currentColor" />
            <span>Curated Collection</span>
          </div>
          <h1 className={styles.title}>My Favorites</h1>
          <p className={styles.subtitle}>
            A personal gallery of all the artwork you&apos;ve favorited across the ArtGenesis marketplace.
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search your favorites..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className={styles.filterBtn}>
            <SlidersHorizontal size={18} /> Filters
          </button>
          
          <div className={styles.viewToggles}>
            <button className={`${styles.viewBtn} ${styles.active}`}><Grid size={18} /></button>
          </div>
        </div>

        {filteredFavorites.length > 0 ? (
          <div className={styles.grid}>
            {filteredFavorites.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.nftImage}
                  />
                  <button 
                    className={styles.favoriteBtn} 
                    onClick={() => toggleFavorite(item)}
                    aria-label="Remove from favorites"
                  >
                    <Heart size={18} fill="#ef4444" color="#ef4444" />
                  </button>
                </div>
                
                <div className={styles.cardInfo}>
                  <div className={styles.collectionMeta}>
                    <span className={styles.collection}>{item.collection}</span>
                    <span className={styles.creator}>{item.creator}</span>
                  </div>
                  
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  
                  <div className={styles.cardFooter}>
                    <div className={styles.priceContainer}>
                      <span className={styles.priceLabel}>Price</span>
                      <span className={styles.priceValue}>{item.price}</span>
                    </div>
                    
                    <Link href="/marketplace" className={styles.buyBtn}>
                      View <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Heart size={48} />
            </div>
            <h2>No favorites found</h2>
            <p>You haven&apos;t favorited any items yet, or none match your search.</p>
            <Link href="/marketplace" className={styles.exploreBtn}>
              Explore Marketplace
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
