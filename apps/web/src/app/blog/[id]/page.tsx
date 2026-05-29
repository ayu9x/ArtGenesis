"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";

import { BLOG_POSTS } from "@/lib/dummyBlogData";

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id as string;
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Article Not Found</h1>
          <Link href="/blog" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Journal
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className={styles.meshBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <main className={styles.main}>
        <Link href="/blog" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.categoryBadge}>
              <Tag size={14} /> {post.category}
            </div>
            
            <h1 className={styles.title}>{post.title}</h1>
            
            <div className={styles.meta}>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  <User size={16} />
                </div>
                <div>
                  <div className={styles.authorName}>{post.author}</div>
                  <div className={styles.authorRole}>ArtGenesis Team</div>
                </div>
              </div>
              
              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <Calendar size={14} /> {post.date}
                </div>
                <div className={styles.detailItem}>
                  <span>•</span> {post.readTime}
                </div>
              </div>
            </div>
          </header>

          <div className={styles.featuredImage}>
            {/* Dummy image representation */}
            <div className={styles.imageOverlay} />
          </div>

          <div className={styles.content}>
            {post.content.map((paragraph: string, idx: number) => (
              <p key={idx} className={styles.paragraph}>{paragraph}</p>
            ))}
          </div>
          
          <footer className={styles.footer}>
            <div className={styles.shareSection}>
              <span className={styles.shareText}>Share this article:</span>
              <button className={styles.shareBtn} onClick={() => alert("Link copied to clipboard!")}>
                <Share2 size={16} /> Copy Link
              </button>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}
