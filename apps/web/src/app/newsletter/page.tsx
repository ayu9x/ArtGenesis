"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Sparkles, Calendar, ExternalLink } from "lucide-react";
import styles from "./page.module.css";

const PAST_ISSUES = [
  {
    id: "1",
    title: "The State of Generative Art in 2024",
    date: "May 25, 2026",
    summary: "Exploring how AI algorithms are pushing the boundaries of what collectors consider valuable digital assets.",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Top 10 Emerging Artists to Watch",
    date: "May 18, 2026",
    summary: "Our curated list of the most promising digital creators who recently joined the ArtGenesis platform.",
    readTime: "7 min read"
  },
  {
    id: "3",
    title: "Understanding Dynamic NFTs",
    date: "May 11, 2026",
    summary: "A deep dive into smart contracts that evolve based on real-world data and collector interactions.",
    readTime: "6 min read"
  }
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
    }, 1500);
  };

  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className={styles.meshBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <main className={styles.main}>
        {/* Subscription Hero */}
        <section className={styles.heroSection}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>The Genesis Block</span>
          </div>
          <h1 className={styles.title}>
            Curated Web3 Art Insights,<br />
            <span className={styles.gradientText}>Delivered Weekly.</span>
          </h1>
          <p className={styles.subtitle}>
            Join 50,000+ collectors and creators who read our newsletter to stay ahead 
            of the curve in the digital art ecosystem.
          </p>

          <div className={styles.subscriptionCard}>
            {isSuccess ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>You&apos;re on the list!</h3>
                <p>Keep an eye on your inbox for the next issue of The Genesis Block.</p>
              </div>
            ) : (
              <form className={styles.subscribeForm} onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} size={20} />
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className={styles.emailInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={styles.subscribeBtn} disabled={isSubmitting}>
                  {isSubmitting ? "Subscribing..." : (
                    <>Subscribe <ArrowRight size={18} /></>
                  )}
                </button>
              </form>
            )}
            <p className={styles.spamDisclaimer}>No spam. Unsubscribe at any time.</p>
          </div>
        </section>

        {/* Past Issues Section */}
        <section className={styles.pastIssuesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Previous Issues</h2>
            <p className={styles.sectionSubtitle}>Catch up on what you&apos;ve missed</p>
          </div>

          <div className={styles.issuesGrid}>
            {PAST_ISSUES.map((issue) => (
              <div key={issue.id} className={styles.issueCard}>
                <div className={styles.issueMeta}>
                  <span className={styles.issueDate}>
                    <Calendar size={14} /> {issue.date}
                  </span>
                  <span className={styles.issueTime}>{issue.readTime}</span>
                </div>
                <h3 className={styles.issueTitle}>{issue.title}</h3>
                <p className={styles.issueSummary}>{issue.summary}</p>
                <Link href={`#`} className={styles.readMoreLink} onClick={(e) => {
                  e.preventDefault();
                  alert("This is a dummy newsletter issue!");
                }}>
                  Read Issue <ExternalLink size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
