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
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Auth state (replaces simulated wallet state for Web2)
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("0x1234...5678");

  useEffect(() => {
    // Check if logged in
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsConnected(true);
      // Optional: decode token to get email, but for now we just show a generic address/username
      setWalletAddress("Logged In");
    }
  }, []);

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
      if (!target.closest(`.${styles.notificationDropdown}`) && !target.closest(`#nav-notifications`)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDarkMode = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDarkMode(initialDarkMode);
    if (!initialDarkMode) {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Update theme when toggled
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

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
          <div className={styles.notificationWrapper}>
            <button
              className={styles.iconButton}
              aria-label="Notifications"
              id="nav-notifications"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell size={18} />
              <span className={styles.notificationBadge}>3</span>
            </button>

            {isNotificationsOpen && (
              <div className={styles.notificationDropdown}>
                <div className={styles.dropdownHeader}>
                  <p className={styles.dropdownName}>Notifications</p>
                </div>
                <div className={styles.dropdownDivider} />
                <div className={styles.notificationItem}>
                  <div className={styles.notificationDot} />
                  <div>
                    <p className={styles.notificationText}><strong>Genesis Block</strong> was sold for 2.5 ETH</p>
                    <p className={styles.notificationTime}>2 hours ago</p>
                  </div>
                </div>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationDot} />
                  <div>
                    <p className={styles.notificationText}>New bid of 1.2 ETH on <strong>Cyber Punk</strong></p>
                    <p className={styles.notificationTime}>5 hours ago</p>
                  </div>
                </div>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationDot} />
                  <div>
                    <p className={styles.notificationText}>You successfully minted <strong>Abstract Horizon</strong></p>
                    <p className={styles.notificationTime}>1 day ago</p>
                  </div>
                </div>
                <div className={styles.dropdownDivider} />
                <Link 
                  href="/notifications" 
                  className={styles.dropdownItem} 
                  style={{ justifyContent: "center" }}
                  onClick={() => setIsNotificationsOpen(false)}
                >
                  View All
                </Link>
              </div>
            )}
          </div>

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
                    onClick={() => {
                      localStorage.removeItem("auth_token");
                      setIsConnected(false);
                      setIsProfileOpen(false);
                      window.location.href = "/";
                    }}
                  >
                    <LogOut size={16} />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={styles.connectButton}
              id="nav-connect-wallet"
            >
              <User size={18} />
              <span>Sign In</span>
            </Link>
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
            <Link
              href="/login"
              className={styles.mobileConnectButton}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={18} />
              Sign In / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
