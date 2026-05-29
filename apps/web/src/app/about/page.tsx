import React from "react";
import Image from "next/image";
import { Shield, Globe, Zap, Users, Target, Rocket } from "lucide-react";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className={styles.meshBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.badge}>
            <Rocket size={16} />
            <span>Our Story</span>
          </div>
          <h1 className={styles.title}>
            Decentralizing the <br />
            <span className={styles.gradientText}>World of Art</span>
          </h1>
          <p className={styles.subtitle}>
            ArtGenesis is the premier destination for discovering, collecting, and trading 
            unique digital creations. We believe in empowering creators and giving collectors 
            true ownership through blockchain technology.
          </p>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.statCard}>
            <h3 className={styles.statValue}>$150M+</h3>
            <p className={styles.statLabel}>Trading Volume</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statValue}>500K+</h3>
            <p className={styles.statLabel}>Active Users</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statValue}>2M+</h3>
            <p className={styles.statLabel}>NFTs Minted</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statValue}>85K+</h3>
            <p className={styles.statLabel}>Creators</p>
          </div>
        </section>

        {/* Mission Section */}
        <section className={styles.missionSection}>
          <div className={styles.missionContent}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.paragraph}>
              Founded in 2024, ArtGenesis was built on a simple premise: artists deserve a 
              fairer ecosystem. The traditional art world is filled with gatekeepers, high fees, 
              and opaque provenance. By leveraging Web3 technology, we&apos;ve built a transparent, 
              trustless, and community-driven marketplace.
            </p>
            <p className={styles.paragraph}>
              Whether you are an established digital artist or a newcomer minting your first piece, 
              ArtGenesis provides the cutting-edge tools, liquidity, and audience you need to thrive.
            </p>
          </div>
          <div className={styles.missionGrid}>
            <div className={styles.featureBox}>
              <Shield size={24} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>Trustless Security</h4>
              <p className={styles.featureDesc}>Audited smart contracts ensure your assets and funds are always safe.</p>
            </div>
            <div className={styles.featureBox}>
              <Zap size={24} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>Lightning Fast</h4>
              <p className={styles.featureDesc}>Built on Polygon for high-speed, low-gas transactions.</p>
            </div>
            <div className={styles.featureBox}>
              <Globe size={24} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>Global Reach</h4>
              <p className={styles.featureDesc}>Connect with collectors from over 150 countries instantly.</p>
            </div>
            <div className={styles.featureBox}>
              <Target size={24} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>Creator First</h4>
              <p className={styles.featureDesc}>Enforceable royalties guarantee you get paid for secondary sales.</p>
            </div>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle} style={{ textAlign: "center", marginBottom: "3rem" }}>Meet Our Leadership</h2>
          
          <div className={styles.teamGrid}>
            {/* CEO & Founder */}
            <div className={styles.teamCard}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatarPlaceholder}>
                  <Users size={48} />
                </div>
              </div>
              <h3 className={styles.memberName}>Ayush Raj</h3>
              <p className={styles.memberRole}>CEO and Founder</p>
              <p className={styles.memberBio}>
                Ayush is a visionary entrepreneur and early blockchain adopter. Before founding ArtGenesis, 
                he led product teams at top Web3 companies, driven by the belief that decentralized architecture 
                is the future of the creator economy.
              </p>
            </div>

            {/* CTO & CFO */}
            <div className={styles.teamCard}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatarPlaceholder}>
                  <Users size={48} />
                </div>
              </div>
              <h3 className={styles.memberName}>Priyanshu Sharma</h3>
              <p className={styles.memberRole}>CTO and CFO</p>
              <p className={styles.memberBio}>
                With deep expertise in both systems engineering and financial strategy, Priyanshu leads 
                our technical architecture and fiscal operations. He ensures our smart contracts are secure 
                while scaling our financial infrastructure to support millions of transactions globally.
              </p>
            </div>

            {/* Dummy Team Member 3 */}
            <div className={styles.teamCard}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatarPlaceholder}>
                  <Users size={48} />
                </div>
              </div>
              <h3 className={styles.memberName}>Marcus Chen</h3>
              <p className={styles.memberRole}>Head of Design</p>
              <p className={styles.memberBio}>
                Marcus brings award-winning design expertise to the Web3 space. He focuses on abstracting 
                away blockchain complexity to create a seamless, beautiful user experience for artists.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
