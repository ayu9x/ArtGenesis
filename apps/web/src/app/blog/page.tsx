"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight, Tag, Bookmark } from "lucide-react";
import styles from "./page.module.css";

import { CATEGORIES, BLOG_POSTS } from "@/lib/dummyBlogData";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  const featuredPost = BLOG_POSTS.find(post => post.featured);
  const standardPosts = filteredPosts.filter(post => !post.featured || activeCategory !== "All");

  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className={styles.meshBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <main className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Bookmark size={16} />
            <span>The Journal</span>
          </div>
          <h1 className={styles.title}>
            Stories from the <br />
            <span className={styles.gradientText}>Digital Frontier</span>
          </h1>
          <p className={styles.subtitle}>
            Read the latest news, tutorials, and deep-dives from the ArtGenesis team and our global community of creators.
          </p>
        </div>

        {/* Categories */}
        <div className={styles.categories}>
          {CATEGORIES.map(category => (
            <button
              key={category}
              className={`${styles.categoryBtn} ${activeCategory === category ? styles.categoryActive : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post (Only show on 'All' tab) */}
        {activeCategory === "All" && featuredPost && (
          <div className={styles.featuredCard}>
            <div className={styles.featuredImagePlaceholder}>
              {/* Dummy Image Background */}
              <div className={styles.featuredOverlay} />
            </div>
            <div className={styles.featuredContent}>
              <div className={styles.postMeta}>
                <span className={styles.categoryTag}>
                  <Tag size={12} /> {featuredPost.category}
                </span>
                <span className={styles.postDate}>
                  <Calendar size={12} /> {featuredPost.date}
                </span>
              </div>
              <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
              <p className={styles.featuredSummary}>{featuredPost.summary}</p>
              
              <div className={styles.featuredFooter}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorAvatar}>
                    <User size={14} />
                  </div>
                  <span className={styles.authorName}>{featuredPost.author}</span>
                  <span className={styles.readTime}>• {featuredPost.readTime}</span>
                </div>
                <Link href={`/blog/${featuredPost.id}`} className={styles.readMoreBtn}>
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Post Grid */}
        <div className={styles.grid}>
          {standardPosts.map(post => (
            <div key={post.id} className={styles.card}>
              <div className={styles.cardMeta}>
                <span className={styles.categoryTag}>
                  <Tag size={12} /> {post.category}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.cardSummary}>{post.summary}</p>
              
              <div className={styles.cardFooter}>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{post.author}</span>
                  <span className={styles.postDate}>{post.date}</span>
                </div>
                <Link href={`/blog/${post.id}`} className={styles.readMoreLink}>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className={styles.emptyState}>
            <p>No posts found in this category yet. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}
