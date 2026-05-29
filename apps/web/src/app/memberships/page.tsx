"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Crown, Shield, Zap, Star, ChevronDown, Check, Sparkles, Users, Gem, Trophy } from "lucide-react";
import styles from "./page.module.css";

const TIERS = [
  {
    name: "Silver Pass",
    tagline: "Start your journey into exclusive Web3 membership.",
    price: "0.15",
    image: "/nfts/pass1.png",
    featured: false,
    perks: [
      "Early access to new drops (24hr head start)",
      "Members-only Discord channels",
      "5% discount on marketplace fees",
      "Monthly community AMA with creators",
      "Silver profile badge",
    ],
  },
  {
    name: "Genesis Pass",
    tagline: "The ultimate collector's membership — limited to 500.",
    price: "1.5",
    image: "/nfts/pass1.png",
    featured: true,
    perks: [
      "Guaranteed whitelist on every ArtGenesis drop",
      "Zero marketplace fees for life",
      "Private vault access & curation tools",
      "Quarterly NFT airdrops from top creators",
      "1-on-1 consultation with ArtGenesis advisors",
      "Genesis holographic profile badge",
    ],
  },
  {
    name: "Gold Pass",
    tagline: "Unlock premium features and priority access.",
    price: "0.6",
    image: "/nfts/pass2.png",
    featured: false,
    perks: [
      "48hr early access to all drops",
      "15% discount on marketplace fees",
      "Exclusive monthly NFT airdrop",
      "Priority customer support",
      "Gold profile badge & custom gallery",
      "Voting rights on platform features",
    ],
  },
];

const ACTIVE_MEMBERSHIPS = [
  { id: "mem1", name: "Genesis Pass #001", tier: "Genesis", image: "/nfts/pass1.png", price: "1.5 ETH", minted: "12 days ago" },
  { id: "mem2", name: "Gold Pass #312", tier: "Gold", image: "/nfts/pass2.png", price: "0.6 ETH", minted: "3 days ago" },
  { id: "mem3", name: "Genesis Pass #047", tier: "Genesis", image: "/nfts/pass1.png", price: "1.5 ETH", minted: "28 days ago" },
  { id: "mem4", name: "Silver Pass #891", tier: "Silver", image: "/nfts/pass1.png", price: "0.15 ETH", minted: "1 day ago" },
  { id: "mem5", name: "Gold Pass #108", tier: "Gold", image: "/nfts/pass2.png", price: "0.6 ETH", minted: "5 days ago" },
  { id: "mem6", name: "Genesis Pass #003", tier: "Genesis", image: "/nfts/pass1.png", price: "1.5 ETH", minted: "45 days ago" },
  { id: "mem7", name: "Silver Pass #442", tier: "Silver", image: "/nfts/pass2.png", price: "0.15 ETH", minted: "2 days ago" },
  { id: "mem8", name: "Gold Pass #077", tier: "Gold", image: "/nfts/pass2.png", price: "0.6 ETH", minted: "8 days ago" },
];

const FAQS = [
  { q: "What is an ArtGenesis Membership?", a: "An ArtGenesis Membership is a unique NFT pass that grants you exclusive benefits on the platform. Each tier unlocks a different level of perks — from fee discounts and early access to guaranteed whitelist spots and lifetime zero fees." },
  { q: "How do I mint a membership?", a: "Simply connect your wallet (MetaMask, WalletConnect, etc.), choose your desired tier, and click 'Mint Pass'. You'll need enough ETH in your wallet to cover the mint price plus a small gas fee. The NFT will appear in your wallet immediately after the transaction confirms." },
  { q: "Can I upgrade my membership?", a: "Yes! You can upgrade from Silver → Gold → Genesis at any time. When upgrading, you'll pay only the difference between your current tier and the new tier. Your original pass will be burned and replaced with the upgraded one." },
  { q: "Are memberships transferable?", a: "Absolutely. Memberships are standard ERC-721 NFTs, so you can transfer or sell them on the ArtGenesis marketplace or any compatible platform. All perks transfer to the new holder." },
  { q: "Is supply limited?", a: "Yes. Genesis Pass is limited to 500 total, Gold Pass to 2,000, and Silver Pass to 10,000. Once they're minted out, the only way to get one is through the secondary market." },
];

export default function MembershipsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.meshBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <main className={styles.main}>
        {/* Hero Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Crown size={16} />
            <span>Exclusive Access</span>
          </div>
          <h1 className={styles.title}>
            ArtGenesis <span className={styles.titleAccent}>Memberships</span>
          </h1>
          <p className={styles.subtitle}>
            Unlock premium benefits, guaranteed whitelist spots, fee discounts, and exclusive airdrops with an ArtGenesis Membership Pass.
          </p>
        </div>

        {/* Tier Cards */}
        <div className={styles.tiersGrid}>
          {TIERS.map((tier, i) => (
            <div key={i} className={`${styles.tierCard} ${tier.featured ? styles.tierFeatured : ""}`}>
              {tier.featured && (
                <div className={styles.featuredBadge}>
                  <Sparkles size={12} /> Most Popular
                </div>
              )}
              <div className={styles.tierImageWrap}>
                <Image src={tier.image} alt={tier.name} fill className={styles.tierImage} sizes="(max-width: 1024px) 100vw, 33vw" />
              </div>
              <div className={styles.tierBody}>
                <h2 className={styles.tierName}>{tier.name}</h2>
                <p className={styles.tierTagline}>{tier.tagline}</p>
                <div className={styles.tierPrice}>
                  <span className={styles.tierPriceValue}>◆ {tier.price} ETH</span>
                </div>
                <ul className={styles.tierPerks}>
                  {tier.perks.map((perk, j) => (
                    <li key={j}>
                      <Check size={16} className={styles.perkIcon} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <button className={`${styles.mintBtn} ${!tier.featured ? styles.mintBtnOutline : ""}`}>
                  <Zap size={16} />
                  Mint {tier.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={styles.statsStrip}>
          <div className={styles.statItem}>
            <div className={`${styles.statValue} ${styles.statAccent}`}>12,500</div>
            <div className={styles.statLabel}>Total Supply</div>
          </div>
          <div className={styles.statItem}>
            <div className={`${styles.statValue} ${styles.statAccent}`}>4,812</div>
            <div className={styles.statLabel}>Passes Minted</div>
          </div>
          <div className={styles.statItem}>
            <div className={`${styles.statValue} ${styles.statAccent}`}>3,290</div>
            <div className={styles.statLabel}>Unique Holders</div>
          </div>
          <div className={styles.statItem}>
            <div className={`${styles.statValue} ${styles.statAccent}`}>420 ETH</div>
            <div className={styles.statLabel}>Total Volume</div>
          </div>
        </div>

        {/* Active Members */}
        <h2 className={styles.sectionTitle}>Recently Minted</h2>
        <p className={styles.sectionSubtitle}>The latest membership passes claimed by the ArtGenesis community.</p>
        <div className={styles.membersGrid}>
          {ACTIVE_MEMBERSHIPS.map((m) => (
            <Link href={`/nft/${m.id}`} key={m.id} className={styles.memberCard}>
              <div className={styles.memberImageWrap}>
                <Image src={m.image} alt={m.name} fill className={styles.memberImage} sizes="(max-width: 640px) 100vw, 25vw" />
              </div>
              <div className={styles.memberInfo}>
                <div className={styles.memberName}>{m.name}</div>
                <div className={styles.memberTier}>
                  <Shield size={12} /> {m.tier} Tier
                </div>
                <div className={styles.memberFooter}>
                  <span className={styles.memberPrice}>{m.price}</span>
                  <span className={styles.memberMinted}>{m.minted}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          {FAQS.map((faq, i) => (
            <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ""}`}>
              <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <ChevronDown size={18} />
              </button>
              {openFaq === i && <div className={styles.faqAnswer}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
