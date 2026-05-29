"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  Wallet,
  Plus,
  User,
  LayoutDashboard,
  Heart,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Simulated wallet state (will be replaced with Wagmi)
  const [isConnected, setIsConnected] = useState(false);
  const walletAddress = "0x1234...5678";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.profileDropdown}`) && !target.closest(`.${styles.profileButton}`)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      id="main-navbar"
    >
      <div className={styles.navContent}>
        {/* Logo */}
        <Link href="/" className={styles.logo} id="nav-logo">
          <div className={styles.logoIcon}>
            <span className={styles.logoGradient}>A</span>
          </div>
          <span className={styles.logoText}>
            Art<span className={styles.logoAccent}>Genesis</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div
          className={`${styles.searchContainer} ${
            isSearchFocused ? styles.searchFocused : ""
          }`}
        >
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search NFTs, collections, creators..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            id="nav-search"
          />
          <kbd className={styles.searchKbd}>⌘K</kbd>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.navLinkActive : ""
              }`}
              id={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
              {pathname === link.href && (
                <span className={styles.activeIndicator} />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Create Button */}
          <Link href="/create" className={styles.createButton} id="nav-create">
            <Plus size={18} />
            <span>Create</span>
          </Link>

          {/* Theme Toggle */}
          <button
            className={styles.iconButton}
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle theme"
            id="nav-theme-toggle"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <button
            className={styles.iconButton}
            aria-label="Notifications"
            id="nav-notifications"
          >
            <Bell size={18} />
            <span className={styles.notificationBadge}>3</span>
          </button>

          {/* Wallet / Profile */}
          {isConnected ? (
            <div className={styles.profileWrapper}>
              <button
                className={styles.profileButton}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                id="nav-profile"
              >
                <div className={styles.profileAvatar}>
                  <User size={16} />
                </div>
                <span className={styles.walletAddr}>{walletAddress}</span>
                <ChevronDown
                  size={14}
                  className={`${styles.chevron} ${
                    isProfileOpen ? styles.chevronOpen : ""
                  }`}
                />
              </button>

              {isProfileOpen && (
                <div className={styles.profileDropdown}>
                  <div className={styles.dropdownHeader}>
                    <div className={styles.profileAvatar}>
                      <User size={20} />
                    </div>
                    <div>
                      <p className={styles.dropdownName}>Creator</p>
                      <p className={styles.dropdownAddr}>{walletAddress}</p>
                    </div>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <Link href="/dashboard" className={styles.dropdownItem}>
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <Link href="/profile" className={styles.dropdownItem}>
                    <User size={16} />
                    My Profile
                  </Link>
                  <Link href="/favorites" className={styles.dropdownItem}>
                    <Heart size={16} />
                    Favorites
                  </Link>
                  <Link href="/settings" className={styles.dropdownItem}>
                    <Settings size={16} />
                    Settings
                  </Link>
                  <div className={styles.dropdownDivider} />
                  <button
                    className={styles.dropdownItem}
                    onClick={() => setIsConnected(false)}
                  >
                    <LogOut size={16} />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className={styles.connectButton}
              onClick={() => setIsConnected(true)}
              id="nav-connect-wallet"
            >
              <Wallet size={18} />
              <span>Connect</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            id="nav-mobile-toggle"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileSearchContainer}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search NFTs..."
              className={styles.searchInput}
              id="nav-mobile-search"
            />
          </div>
          <div className={styles.mobileNavLinks}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileNavLink} ${
                  pathname === link.href ? styles.mobileNavLinkActive : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/create" className={styles.mobileNavLink}>
              Create
            </Link>
          </div>
          {!isConnected && (
            <button
              className={styles.mobileConnectButton}
              onClick={() => setIsConnected(true)}
            >
              <Wallet size={18} />
              Connect Wallet
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
