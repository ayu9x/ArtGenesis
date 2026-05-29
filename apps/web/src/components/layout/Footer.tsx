"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  MessageCircle,
  Video,
  Camera,
  Music2,
  Mail,
  ArrowUpRight,
  Heart,
  Globe
} from "lucide-react";
import styles from "./Footer.module.css";

const MARKETPLACE_LINKS = [
  { href: "/marketplace?category=art", label: "Art" },
  { href: "/marketplace?category=gaming", label: "Gaming" },
  { href: "/marketplace?category=memberships", label: "Memberships" },
  { href: "/marketplace?category=pfps", label: "PFPs" },
  { href: "/marketplace?category=photography", label: "Photography" },
  { href: "/marketplace?category=music", label: "Music" },
];

const ACCOUNT_LINKS = [
  { href: "/profile", label: "Profile" },
  { href: "/favorites", label: "Favorites" },
  { href: "/watchlist", label: "Watchlist" },
  { href: "/collections", label: "My Collections" },
  { href: "/settings", label: "Settings" },
];

const RESOURCE_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/docs", label: "Documentation" },
  { href: "/newsletter", label: "Newsletter" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "#", icon: Globe, label: "Twitter" },
  { href: "#", icon: Camera, label: "Instagram" },
  { href: "#", icon: MessageCircle, label: "Discord" },
  { href: "#", icon: Video, label: "YouTube" },
  { href: "#", icon: Music2, label: "TikTok" },
  { href: "#", icon: Mail, label: "Email" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className={styles.footer} id="footer">
      {/* Newsletter Section */}
      <div className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <div className={styles.newsletterInfo}>
            <h3 className={styles.newsletterTitle}>Stay in the loop</h3>
            <p className={styles.newsletterDesc}>
              Subscribe to our mailing list for the latest feature releases, NFT
              drops, and expert tips for navigating ArtGenesis.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
                required
                id="footer-email-input"
              />
            </div>
            <button
              type="submit"
              className={styles.subscribeButton}
              id="footer-subscribe"
            >
              {isSubscribed ? (
                "Subscribed! ✓"
              ) : (
                <>
                  Sign Up <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Social Section */}
      <div className={styles.socialSection}>
        <h4 className={styles.socialTitle}>Join the community</h4>
        <div className={styles.socialLinks}>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className={styles.socialLink}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <social.icon size={20} />
              <span>{social.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Links Grid */}
      <div className={styles.linksGrid}>
        {/* Brand Column */}
        <div className={styles.brandColumn}>
          <Link href="/" className={styles.footerLogo}>
            <div className={styles.logoIcon}>
              <span>A</span>
            </div>
            <span className={styles.logoText}>
              Art<span className={styles.logoAccent}>Genesis</span>
            </span>
          </Link>
          <p className={styles.brandDesc}>
            The premier global platform for trading crypto collectibles and
            NFTs. Explore, buy, and sell unique digital assets in a
            one-of-a-kind marketplace.
          </p>
        </div>

        {/* Link Columns */}
        <div className={styles.linkColumn}>
          <h5 className={styles.columnTitle}>Marketplace</h5>
          <ul className={styles.columnList}>
            {MARKETPLACE_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.columnLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linkColumn}>
          <h5 className={styles.columnTitle}>My Account</h5>
          <ul className={styles.columnList}>
            {ACCOUNT_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.columnLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linkColumn}>
          <h5 className={styles.columnTitle}>Resources</h5>
          <ul className={styles.columnList}>
            {RESOURCE_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.columnLink}>
                  {link.label}
                  <ArrowUpRight size={12} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linkColumn}>
          <h5 className={styles.columnTitle}>Company</h5>
          <ul className={styles.columnList}>
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.columnLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} ArtGenesis. All rights reserved.
        </p>
        <p className={styles.madeWith}>
          Made with <Heart size={14} className={styles.heartIcon} /> by ArtGenesis Team
        </p>
      </div>
    </footer>
  );
}
