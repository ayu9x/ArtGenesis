"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Compass, 
  Grid, 
  Disc, 
  ArrowLeftRight, 
  Calendar, 
  List, 
  Anchor, 
  Wand2,
  User,
  ChevronDown,
  FileText,
  Settings,
  HelpCircle
} from "lucide-react";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(true);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.hoverTrigger} />
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
        {/* Main Navigation */}
        <div className={styles.navGroup}>
          <Link href="/" className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}>
            <Compass size={20} />
            <span>Discover</span>
          </Link>
          <Link href="/collections" className={`${styles.navItem} ${pathname === "/collections" ? styles.active : ""}`}>
            <Grid size={20} />
            <span>Collections</span>
          </Link>
          <Link href="/tokens" className={`${styles.navItem} ${pathname === "/tokens" ? styles.active : ""}`}>
            <Disc size={20} />
            <span>Tokens</span>
          </Link>
          <Link href="/swap" className={`${styles.navItem} ${pathname === "/swap" ? styles.active : ""}`}>
            <ArrowLeftRight size={20} />
            <span>Swap</span>
          </Link>
          <Link href="/drops" className={`${styles.navItem} ${pathname === "/drops" ? styles.active : ""}`}>
            <Calendar size={20} />
            <span>Drops</span>
          </Link>
          <Link href="/activity" className={`${styles.navItem} ${pathname === "/activity" ? styles.active : ""}`}>
            <List size={20} />
            <span>Activity</span>
          </Link>
          <Link href="/rewards" className={`${styles.navItem} ${pathname === "/rewards" ? styles.active : ""}`}>
            <Anchor size={20} />
            <span>Rewards</span>
          </Link>
          
          <Link href="/studio" className={`${styles.navItem} ${styles.studioBtn} ${pathname === "/studio" ? styles.active : ""}`}>
            <Wand2 size={20} />
            <span>Studio</span>
          </Link>
        </div>

        {/* Profile Section */}
        <div className={styles.dropdownSection}>
          <button 
            className={`${styles.dropdownTrigger} ${profileOpen ? styles.openTrigger : ""} ${(pathname.startsWith("/profile") || pathname === "/watchlist" || pathname === "/favorites") && !profileOpen ? styles.active : ""}`}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className={styles.triggerLeft}>
              <User size={20} />
              <span>Profile</span>
            </div>
            <ChevronDown size={16} className={`${styles.chevron} ${profileOpen ? styles.chevronOpen : ""}`} />
          </button>
          
          {profileOpen && (
            <div className={styles.dropdownContent}>
              <Link href="/profile?tab=galleries" className={styles.subItem}>Galleries</Link>
              <Link href="/profile" className={`${styles.subItem} ${pathname === "/profile" ? styles.activeSub : ""}`}>Items</Link>
              <Link href="/profile?tab=tokens" className={styles.subItem}>Tokens</Link>
              <Link href="/profile?tab=portfolio" className={styles.subItem}>Portfolio</Link>
              <Link href="/profile?tab=listings" className={styles.subItem}>Listings</Link>
              <Link href="/profile?tab=offers" className={styles.subItem}>Offers</Link>
              <Link href="/profile?tab=created" className={styles.subItem}>Created</Link>
              <Link href="/watchlist" className={`${styles.subItem} ${pathname === "/watchlist" ? styles.activeSub : ""}`}>Watchlist</Link>
              <Link href="/favorites" className={`${styles.subItem} ${pathname === "/favorites" ? styles.activeSub : ""}`}>Favorites</Link>
              <Link href="/profile?tab=activity" className={styles.subItem}>Activity</Link>
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* Resources Section */}
        <div className={styles.dropdownSection}>
          <button 
            className={`${styles.dropdownTrigger} ${resourcesOpen ? styles.openTrigger : ""}`}
            onClick={() => setResourcesOpen(!resourcesOpen)}
          >
            <div className={styles.triggerLeft}>
              <FileText size={20} />
              <span>Resources</span>
            </div>
            <ChevronDown size={16} className={`${styles.chevron} ${resourcesOpen ? styles.chevronOpen : ""}`} />
          </button>
          
          {resourcesOpen && (
            <div className={styles.dropdownContent}>
              <Link href="/learn" className={styles.subItem}>Learn</Link>
              <Link href="/help" className={styles.subItem}>Help Center</Link>
              <Link href="/blog" className={styles.subItem}>Blog</Link>
              <Link href="/careers" className={styles.subItem}>Careers</Link>
              <Link href="/about" className={styles.subItem}>About</Link>
              <Link href="/tax-resources" className={styles.subItem}>Tax Resources</Link>
              <a href="#" className={styles.subItem}>Discord</a>
              <Link href="/docs" className={styles.subItem}>Dev Docs</Link>
              <Link href="/whats-new" className={styles.subItem}>What's New</Link>
            </div>
          )}
        </div>

        {/* Settings Section */}
        <div className={styles.dropdownSection}>
          <button 
            className={`${styles.dropdownTrigger} ${settingsOpen ? styles.openTrigger : ""} ${pathname === "/settings" && !settingsOpen ? styles.active : ""}`}
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <div className={styles.triggerLeft}>
              <Settings size={20} />
              <span>Settings</span>
            </div>
            <ChevronDown size={16} className={`${styles.chevron} ${settingsOpen ? styles.chevronOpen : ""}`} />
          </button>
          
          {settingsOpen && (
            <div className={styles.dropdownContent}>
              <Link href="/settings" className={`${styles.subItem} ${pathname === "/settings" ? styles.activeSub : ""}`}>Profile</Link>
              <Link href="/settings?tab=wallets" className={styles.subItem}>Linked Wallets</Link>
              <Link href="/settings?tab=notifications" className={styles.subItem}>Notifications</Link>
              <Link href="/settings?tab=customize" className={styles.subItem}>Customize</Link>
              <Link href="/settings?tab=developer" className={styles.subItem}>Developer</Link>
              <Link href="/settings?tab=verification" className={styles.subItem}>Verification</Link>
              <Link href="/settings?tab=shortcuts" className={styles.subItem}>Shortcuts</Link>
            </div>
          )}
        </div>

        {/* Support */}
        <Link href="/help" className={`${styles.navItem} ${styles.supportItem}`}>
          <HelpCircle size={20} />
          <span>Support</span>
        </Link>
      </nav>
    </aside>
    </div>
  );
}
