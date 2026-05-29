"use client";

import React, { useState } from "react";
import { User, Bell, Shield, Wallet, Link as LinkIcon, Save, CreditCard } from "lucide-react";
import styles from "./page.module.css";

const SETTINGS_TABS = [
  { id: "profile", label: "Profile", icon: <User size={18} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  { id: "security", label: "Security", icon: <Shield size={18} /> },
  { id: "wallets", label: "Wallets", icon: <Wallet size={18} /> },
  { id: "apps", label: "Connected Apps", icon: <LinkIcon size={18} /> },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Settings</h3>
        </div>
        <nav className={styles.nav}>
          {SETTINGS_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.main}>
        {activeTab === "profile" && (
          <>
            <div className={styles.header}>
              <h1>Profile Settings</h1>
            </div>
            <div className={styles.formSection}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Username</label>
                <input type="text" className={styles.input} placeholder="collector42" defaultValue="collector42" />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Bio</label>
                <textarea className={styles.textarea} placeholder="Tell the world your story..." rows={4} defaultValue="Digital art enthusiast and early adopter."></textarea>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input type="email" className={styles.input} placeholder="your@email.com" defaultValue="rajayush9052@gmail.com" />
                <p className={styles.hint}>Used for notifications only. Not displayed publicly.</p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Social Links</label>
                <div className={styles.inputWithPrefix}>
                  <span className={styles.prefix}>twitter.com/</span>
                  <input type="text" className={styles.input} placeholder="username" />
                </div>
                <div className={styles.inputWithPrefix} style={{ marginTop: '0.75rem' }}>
                  <span className={styles.prefix}>instagram.com/</span>
                  <input type="text" className={styles.input} placeholder="username" />
                </div>
              </div>

              <button className={styles.btnPrimary} onClick={() => alert("Profile saved!")}><Save size={18} /> Save Changes</button>
            </div>
          </>
        )}

        {activeTab === "notifications" && (
          <>
            <div className={styles.header}>
              <h1>Notification Preferences</h1>
            </div>
            <div className={styles.formSection}>
              <div className={styles.toggleGroup}>
                <div className={styles.toggleText}>
                  <h4>Item Sold</h4>
                  <p>When someone purchases one of your items</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleGroup}>
                <div className={styles.toggleText}>
                  <h4>Bid Activity</h4>
                  <p>When someone bids on your item or outbids you</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleGroup}>
                <div className={styles.toggleText}>
                  <h4>Price Changes</h4>
                  <p>When an item you favorited drops in price</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleGroup}>
                <div className={styles.toggleText}>
                  <h4>Newsletter</h4>
                  <p>Weekly updates from the ArtGenesis team</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <button className={styles.btnPrimary} onClick={() => alert("Preferences saved!")}><Save size={18} /> Save Preferences</button>
            </div>
          </>
        )}

        {activeTab === "security" && (
          <>
            <div className={styles.header}>
              <h1>Security Settings</h1>
            </div>
            <div className={styles.formSection}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Current Password</label>
                <input type="password" className={styles.input} placeholder="••••••••" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>New Password</label>
                <input type="password" className={styles.input} placeholder="••••••••" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirm New Password</label>
                <input type="password" className={styles.input} placeholder="••••••••" />
              </div>
              
              <hr className={styles.divider} />

              <div className={styles.toggleGroup}>
                <div className={styles.toggleText}>
                  <h4>Two-Factor Authentication (2FA)</h4>
                  <p>Require an authenticator app code to log in.</p>
                </div>
                <button className={styles.btnSecondary}>Enable 2FA</button>
              </div>

              <button className={styles.btnPrimary} onClick={() => alert("Security settings updated!")}><Save size={18} /> Update Password</button>
            </div>
          </>
        )}

        {activeTab === "wallets" && (
          <>
            <div className={styles.header}>
              <h1>Connected Wallets</h1>
            </div>
            <div className={styles.formSection}>
              <p className={styles.paragraph}>Manage your Web3 wallets connected to your ArtGenesis account.</p>
              
              <div className={styles.walletCard}>
                <div className={styles.walletInfo}>
                  <div className={styles.walletIcon}><Wallet size={24} /></div>
                  <div>
                    <h4 className={styles.walletName}>MetaMask</h4>
                    <p className={styles.walletAddress}>0x1234...5678</p>
                  </div>
                </div>
                <span className={styles.badgePrimary}>Primary</span>
              </div>

              <div className={styles.walletCard}>
                <div className={styles.walletInfo}>
                  <div className={styles.walletIcon}><Wallet size={24} /></div>
                  <div>
                    <h4 className={styles.walletName}>Coinbase Wallet</h4>
                    <p className={styles.walletAddress}>0xabcd...efgh</p>
                  </div>
                </div>
                <button className={styles.btnDanger}>Disconnect</button>
              </div>

              <button className={styles.btnSecondary} style={{ marginTop: '1rem' }}>+ Connect New Wallet</button>

              <hr className={styles.divider} />

              <div className={styles.header}>
                <h1>Payment Methods</h1>
              </div>
              <p className={styles.paragraph}>Manage your credit cards for fiat on-ramping.</p>

              <div className={styles.walletCard}>
                <div className={styles.walletInfo}>
                  <div className={styles.walletIcon}><CreditCard size={24} /></div>
                  <div>
                    <h4 className={styles.walletName}>Visa ending in 4242</h4>
                    <p className={styles.walletAddress}>Expires 12/28</p>
                  </div>
                </div>
                <button className={styles.btnDanger}>Remove</button>
              </div>
            </div>
          </>
        )}

        {activeTab === "apps" && (
          <>
            <div className={styles.header}>
              <h1>Connected Apps</h1>
            </div>
            <div className={styles.formSection}>
              <p className={styles.paragraph}>Manage third-party applications that have access to your ArtGenesis account.</p>
              
              <div className={styles.walletCard}>
                <div className={styles.walletInfo}>
                  <div className={styles.appIcon}>D</div>
                  <div>
                    <h4 className={styles.walletName}>Discord Bot</h4>
                    <p className={styles.walletAddress}>Authorized on May 10, 2026</p>
                  </div>
                </div>
                <button className={styles.btnDanger}>Revoke Access</button>
              </div>

              <div className={styles.walletCard}>
                <div className={styles.walletInfo}>
                  <div className={styles.appIcon} style={{ background: '#1DA1F2' }}>T</div>
                  <div>
                    <h4 className={styles.walletName}>Twitter Integration</h4>
                    <p className={styles.walletAddress}>Authorized on May 11, 2026</p>
                  </div>
                </div>
                <button className={styles.btnDanger}>Revoke Access</button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
