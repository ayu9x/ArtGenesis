"use client";

import React, { useState, useEffect } from "react";
import { User, Bell, Shield, Wallet, Link as LinkIcon, Save, CreditCard, CheckCircle2, Loader2, XCircle, Copy, Check, Settings, Menu, X } from "lucide-react";
import styles from "./page.module.css";

const SETTINGS_TABS = [
  { id: "profile", label: "Profile", icon: <User size={18} /> },
  { id: "wallets", label: "Linked Wallets", icon: <Wallet size={18} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  { id: "customize", label: "Customize", icon: <Settings size={18} /> },
  { id: "security", label: "Security", icon: <Shield size={18} /> },
  { id: "apps", label: "Connected Apps", icon: <LinkIcon size={18} /> },
  { id: "developer", label: "Developer", icon: <LinkIcon size={18} /> },
  { id: "verification", label: "Verification", icon: <CheckCircle2 size={18} /> },
  { id: "shortcuts", label: "Shortcuts", icon: <Check size={18} /> },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Real wallet state
  const [connectedWallets, setConnectedWallets] = useState<{ name: string; address: string; isPrimary: boolean }[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [copiedAddr, setCopiedAddr] = useState<string | null>(null);
  const [hasMetaMask, setHasMetaMask] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== "undefined" && (window as any).ethereum) {
      setHasMetaMask(true);

      // Check if already connected
      (window as any).ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setConnectedWallets([
              { name: "MetaMask", address: accounts[0], isPrimary: true },
            ]);
          }
        })
        .catch(() => {});

      // Listen for account changes
      (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          setConnectedWallets([]);
        } else {
          setConnectedWallets([
            { name: "MetaMask", address: accounts[0], isPrimary: true },
          ]);
        }
      });
    }
  }, []);

  const connectMetaMask = async () => {
    if (!(window as any).ethereum) {
      setWalletError("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }

    setIsConnecting(true);
    setWalletError(null);

    try {
      const accounts: string[] = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        // Check if already connected
        const alreadyConnected = connectedWallets.some(
          (w) => w.address.toLowerCase() === accounts[0].toLowerCase()
        );
        if (!alreadyConnected) {
          setConnectedWallets((prev) => [
            ...prev.map((w) => ({ ...w, isPrimary: prev.length === 0 ? true : w.isPrimary })),
            {
              name: "MetaMask",
              address: accounts[0],
              isPrimary: connectedWallets.length === 0,
            },
          ]);
        }
      }
    } catch (err: any) {
      if (err.code === 4001) {
        setWalletError("Connection rejected. You declined the MetaMask request.");
      } else {
        setWalletError(err.message || "Failed to connect wallet.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = (address: string) => {
    setConnectedWallets((prev) => {
      const updated = prev.filter((w) => w.address !== address);
      // If we removed the primary, make the first remaining one primary
      if (updated.length > 0 && !updated.some((w) => w.isPrimary)) {
        updated[0].isPrimary = true;
      }
      return updated;
    });
  };

  const setPrimaryWallet = (address: string) => {
    setConnectedWallets((prev) =>
      prev.map((w) => ({ ...w, isPrimary: w.address === address }))
    );
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddr(address);
    setTimeout(() => setCopiedAddr(null), 2000);
  };

  const shortenAddress = (addr: string) =>
    `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  return (
    <div className={styles.page}>
      <div className={styles.mobileSidebarHeader}>
        <h3>Settings</h3>
        <button className={styles.sidebarToggleBtn} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h3>Settings</h3>
        </div>
        <nav className={styles.nav}>
          {SETTINGS_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setIsSidebarOpen(false);
              }}
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
              
              {/* Error message */}
              {walletError && (
                <div className={styles.errorBanner}>
                  <XCircle size={18} />
                  <span>{walletError}</span>
                  <button onClick={() => setWalletError(null)} className={styles.errorClose}><XCircle size={14} /></button>
                </div>
              )}

              {/* Connected Wallets */}
              {connectedWallets.length > 0 ? (
                connectedWallets.map((wallet) => (
                  <div key={wallet.address} className={styles.walletCard}>
                    <div className={styles.walletInfo}>
                      <div className={styles.walletIcon}>
                        <Wallet size={24} />
                        <span className={styles.walletConnectedDot} />
                      </div>
                      <div>
                        <h4 className={styles.walletName}>{wallet.name}</h4>
                        <div className={styles.walletAddressRow}>
                          <p className={styles.walletAddress}>{shortenAddress(wallet.address)}</p>
                          <button
                            className={styles.copyAddrBtn}
                            onClick={() => copyAddress(wallet.address)}
                            title="Copy full address"
                          >
                            {copiedAddr === wallet.address ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={styles.walletActions}>
                      {wallet.isPrimary ? (
                        <span className={styles.badgePrimary}>
                          <CheckCircle2 size={12} /> Primary
                        </span>
                      ) : (
                        <button className={styles.btnSecondary} onClick={() => setPrimaryWallet(wallet.address)}>
                          Set Primary
                        </button>
                      )}
                      <button className={styles.btnDanger} onClick={() => disconnectWallet(wallet.address)}>
                        Disconnect
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyWallets}>
                  <Wallet size={40} />
                  <h4>No Wallets Connected</h4>
                  <p>Connect your MetaMask wallet to start trading NFTs on ArtGenesis.</p>
                </div>
              )}

              {/* Connect button */}
              <button
                className={styles.btnPrimary}
                style={{ marginTop: '1.5rem' }}
                onClick={connectMetaMask}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <Loader2 size={18} className={styles.spinner} /> Connecting...
                  </>
                ) : (
                  <>
                    <Wallet size={18} /> {hasMetaMask ? "Connect MetaMask" : "Install MetaMask"}
                  </>
                )}
              </button>

              {!hasMetaMask && (
                <p className={styles.hint} style={{ marginTop: '0.5rem' }}>
                  MetaMask extension not detected.{' '}
                  <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>
                    Download MetaMask →
                  </a>
                </p>
              )}

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

        {/* Customize Tab */}
        {activeTab === "customize" && (
          <>
            <div className={styles.header}>
              <h1>Customize</h1>
            </div>
            <div className={styles.formSection}>
              <p className={styles.paragraph}>Manage your theme and display preferences.</p>

              <div className={styles.toggleGroup}>
                <div className={styles.toggleText}>
                  <h4>Dark Mode</h4>
                  <p>Use a dark theme for the interface.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleGroup}>
                <div className={styles.toggleText}>
                  <h4>Reduce Animations</h4>
                  <p>Minimize motion and animations throughout the site.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </>
        )}

        {/* Developer Tab */}
        {activeTab === "developer" && (
          <>
            <div className={styles.header}>
              <h1>Developer</h1>
            </div>
            <div className={styles.formSection}>
              <p className={styles.paragraph}>Manage API keys and developer settings.</p>

              <div className={styles.formGroup}>
                <label className={styles.label}>API Key</label>
                <div className={styles.inputWithPrefix}>
                  <input type="password" value="************************" readOnly className={styles.input} style={{ borderRadius: '8px' }} />
                  <button className={styles.btnSecondary} style={{ marginLeft: '1rem' }}><Copy size={16} /></button>
                </div>
                <p className={styles.hint}>Never share your API key with anyone.</p>
              </div>

              <button className={styles.btnPrimary}>Generate New Key</button>
            </div>
          </>
        )}

        {/* Verification Tab */}
        {activeTab === "verification" && (
          <>
            <div className={styles.header}>
              <h1>Verification</h1>
            </div>
            <div className={styles.formSection}>
              <p className={styles.paragraph}>Verify your identity to increase limits and get a verified badge.</p>

              <div className={styles.walletCard}>
                <div className={styles.walletInfo}>
                  <div className={styles.walletIcon}><Shield size={24} /></div>
                  <div>
                    <h4 className={styles.walletName}>Identity Verification (KYC)</h4>
                    <p className={styles.walletAddress}>Not Verified</p>
                  </div>
                </div>
                <button className={styles.btnPrimary}>Start Verification</button>
              </div>
            </div>
          </>
        )}

        {/* Shortcuts Tab */}
        {activeTab === "shortcuts" && (
          <>
            <div className={styles.header}>
              <h1>Shortcuts</h1>
            </div>
            <div className={styles.formSection}>
              <p className={styles.paragraph}>Keyboard shortcuts to navigate faster.</p>

              <div className={styles.toggleGroup}>
                <div className={styles.toggleText}>
                  <h4>Global Search</h4>
                </div>
                <div className={styles.badgePrimary} style={{ fontSize: '0.85rem' }}>Ctrl + K</div>
              </div>
              <div className={styles.toggleGroup}>
                <div className={styles.toggleText}>
                  <h4>Go to Profile</h4>
                </div>
                <div className={styles.badgePrimary} style={{ fontSize: '0.85rem' }}>G then P</div>
              </div>
              <div className={styles.toggleGroup}>
                <div className={styles.toggleText}>
                  <h4>Create Listing</h4>
                </div>
                <div className={styles.badgePrimary} style={{ fontSize: '0.85rem' }}>C</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
