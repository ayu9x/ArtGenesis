"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  Image as ImageIcon,
  BarChart3,
  Trash2,
  Shield,
  ShieldCheck,
  RefreshCcw,
  Search,
  ChevronDown,
  ChevronUp,
  Activity,
  Database,
  Tag,
  AlertTriangle,
  X,
  Eye,
  Lock,
} from "lucide-react";
import styles from "./page.module.css";

const API_BASE = typeof window !== "undefined" && window.location.hostname !== "localhost" 
  ? `http://${window.location.hostname}:3001` 
  : "http://localhost:3001";

// ============ Types ============
interface UserData {
  id: string;
  email: string | null;
  username: string | null;
  address: string | null;
  role: string;
  bio: string | null;
  avatarUrl: string | null;
  twitter: string | null;
  instagram: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
  _count: { nfts: number; collections: number; activities: number };
}

interface NftData {
  id: string;
  tokenId: string;
  name: string;
  imageUrl: string;
  contractAddress: string;
  ownerAddress: string;
  createdAt: string;
  owner: { id: string; email: string | null; username: string | null; address: string | null };
  collection: { id: string; name: string } | null;
  listings: { id: string; price: string; status: string; type: string }[];
}

interface StatsData {
  totalUsers: number;
  totalNfts: number;
  totalListings: number;
  activeListings: number;
  totalCollections: number;
  recentUsers: number;
  totalLogins: number;
  totalSignups: number;
}

interface ActivityData {
  id: string;
  type: string;
  txHash: string | null;
  price: string | null;
  fromAddress: string | null;
  toAddress: string | null;
  createdAt: string;
  nft: { id: string; name: string; imageUrl: string } | null;
  user: { id: string; email: string | null; username: string | null } | null;
}

const TABS = [
  { id: "overview", label: "Overview", icon: <BarChart3 size={18} /> },
  { id: "users", label: "Users", icon: <Users size={18} /> },
  { id: "nfts", label: "NFTs", icon: <ImageIcon size={18} /> },
  { id: "activity", label: "Activity Log", icon: <Activity size={18} /> },
  { id: "database", label: "Database", icon: <Database size={18} /> },
];

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<StatsData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [nfts, setNfts] = useState<NftData[]>([]);
  const [nftsTotal, setNftsTotal] = useState(0);
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Admin login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, passwordStr: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("auth_token", data.token);
        window.location.reload();
      } else {
        setLoginError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setLoginError("Failed to connect to server");
    }
    setIsLoggingIn(false);
  };

  const getToken = () => {
    if (typeof window !== "undefined") return localStorage.getItem("auth_token");
    return null;
  };

  const headers = useCallback(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  }), []);

  // Check admin auth
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    try {
      const parts = token.split(".");
      if (parts.length !== 3) { setIsAdmin(false); setLoading(false); return; }
      const payload = JSON.parse(atob(parts[1]));
      if (payload.role === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch {
      setIsAdmin(false);
    }
    setLoading(false);
  }, []);

  const [errorMsg, setErrorMsg] = useState("");

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/stats`, { headers: headers() });
      if (res.ok) setStats(await res.json());
      else setErrorMsg(`Failed to fetch stats: ${res.statusText}`);
    } catch (err: any) { setErrorMsg(`Network error fetching stats: ${err.message}`); }
  }, [headers]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/users?take=100`, { headers: headers() });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setUsersTotal(data.total);
      } else setErrorMsg(`Failed to fetch users: ${res.statusText}`);
    } catch (err: any) { setErrorMsg(`Network error fetching users: ${err.message}`); }
  }, [headers]);

  const fetchNfts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/nfts?take=100`, { headers: headers() });
      if (res.ok) {
        const data = await res.json();
        setNfts(data.nfts);
        setNftsTotal(data.total);
      }
    } catch { /* ignore */ }
  }, [headers]);

  const fetchActivity = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/activity?take=50`, { headers: headers() });
      if (res.ok) setActivities(await res.json());
    } catch { /* ignore */ }
  }, [headers]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
      fetchUsers();
      fetchNfts();
      fetchActivity();
    }
  }, [isAdmin, fetchStats, fetchUsers, fetchNfts, fetchActivity]);

  // Actions
  const handleDeleteUser = async (id: string) => {
    try {
      await fetch(`${API_BASE}/admin/users/${id}`, { method: "DELETE", headers: headers() });
      setConfirmDelete(null);
      fetchUsers();
      fetchStats();
    } catch { /* ignore */ }
  };

  const handleToggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    try {
      await fetch(`${API_BASE}/admin/users/${id}/role`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify({ role: newRole }),
      });
      fetchUsers();
    } catch { /* ignore */ }
  };

  const handleDeleteNft = async (id: string) => {
    try {
      await fetch(`${API_BASE}/admin/nfts/${id}`, { method: "DELETE", headers: headers() });
      fetchNfts();
      fetchStats();
    } catch { /* ignore */ }
  };

  const refreshAll = () => {
    fetchStats();
    fetchUsers();
    fetchNfts();
    fetchActivity();
  };

  // Filtered users
  const filteredUsers = users.filter(
    (u) =>
      (u.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.username || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.address || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNfts = nfts.filter(
    (n) =>
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tokenId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.owner?.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingScreen}>
          <div className={styles.spinner} />
          <p>Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className={styles.page}>
        <div className={styles.adminLoginContainer}>
          <div className={styles.adminLoginBox}>
            <ShieldCheck size={48} className={styles.lockIcon} />
            <h1>Admin Authentication</h1>
            <p>Please log in with your admin credentials to access the management dashboard.</p>
            {loginError && <div className={styles.errorMessage}>{loginError}</div>}
            <form onSubmit={handleAdminLogin} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail} 
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={styles.inputField}
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Password</label>
                <input 
                  type="password" 
                  value={loginPassword} 
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={styles.inputField}
                  placeholder="••••••••"
                  required
                />
              </div>
              <button type="submit" className={styles.loginBtn} disabled={isLoggingIn}>
                {isLoggingIn ? "Authenticating..." : "Access Admin Panel"}
              </button>
            </form>
            <p className={styles.hint}>
              Logging in here will securely update your session token with administrator privileges.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.adminBadge}>
            <ShieldCheck size={20} />
            <span>Admin Panel</span>
          </div>
          <h1 className={styles.title}>Platform Management</h1>
        </div>
        <button className={styles.refreshBtn} onClick={refreshAll}>
          <RefreshCcw size={16} /> Refresh All
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.content}>
        {errorMsg && (
          <div className={styles.errorMessage} style={{ marginBottom: '2rem' }}>
            <AlertTriangle size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
            {errorMsg}
          </div>
        )}

        {/* ============ Overview ============ */}
        {activeTab === "overview" && stats && (
          <div className={styles.overviewGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: "rgba(139, 92, 246, 0.15)", color: "#8b5cf6" }}>
                <Users size={24} />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.totalUsers}</span>
                <span className={styles.statLabel}>Total Users</span>
              </div>
              <span className={styles.statBadge}>+{stats.recentUsers} this week</span>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: "rgba(236, 72, 153, 0.15)", color: "#ec4899" }}>
                <Activity size={24} />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.totalLogins}</span>
                <span className={styles.statLabel}>Total Logins</span>
              </div>
              <span className={styles.statBadge}>{stats.totalSignups} total signups</span>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: "rgba(6, 182, 212, 0.15)", color: "#06b6d4" }}>
                <ImageIcon size={24} />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.totalNfts}</span>
                <span className={styles.statLabel}>Total NFTs</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                <Tag size={24} />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.activeListings}</span>
                <span className={styles.statLabel}>Active Listings</span>
              </div>
              <span className={styles.statBadge}>{stats.totalListings} total</span>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>
                <Database size={24} />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.totalCollections}</span>
                <span className={styles.statLabel}>Collections</span>
              </div>
            </div>
          </div>
        )}

        {/* ============ Users ============ */}
        {activeTab === "users" && (
          <>
            <div className={styles.sectionHeader}>
              <h2>All Users ({usersTotal})</h2>
              <div className={styles.searchBar}>
                <Search size={16} />
                <input
                  placeholder="Search by email, username, address, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Wallet Address</th>
                    <th>Role</th>
                    <th>NFTs</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <React.Fragment key={user.id}>
                      <tr
                        className={`${styles.row} ${expandedUser === user.id ? styles.rowExpanded : ""}`}
                        onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                      >
                        <td>
                          <div className={styles.userCell}>
                            <div className={styles.avatar}>
                              {(user.username || user.email || "?").charAt(0).toUpperCase()}
                            </div>
                            <span>{user.username || "—"}</span>
                          </div>
                        </td>
                        <td className={styles.emailCell}>{user.email || "—"}</td>
                        <td className={styles.monoCell}>
                          {user.address ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}` : "—"}
                        </td>
                        <td>
                          <span className={`${styles.roleBadge} ${user.role === "ADMIN" ? styles.roleAdmin : styles.roleUser}`}>
                            {user.role === "ADMIN" ? <ShieldCheck size={12} /> : <Shield size={12} />}
                            {user.role}
                          </span>
                        </td>
                        <td>{user._count.nfts}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
                            <button
                              className={styles.actionBtn}
                              onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                              title="View details"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              className={styles.actionBtn}
                              onClick={() => handleToggleRole(user.id, user.role)}
                              title={user.role === "ADMIN" ? "Demote to User" : "Promote to Admin"}
                            >
                              <Shield size={14} />
                            </button>
                            <button
                              className={`${styles.actionBtn} ${styles.dangerBtn}`}
                              onClick={() => setConfirmDelete(user.id)}
                              title="Delete user"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedUser === user.id && (
                        <tr className={styles.expandedRow}>
                          <td colSpan={7}>
                            <div className={styles.expandedContent}>
                              <div className={styles.detailGrid}>
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>User ID</span>
                                  <span className={styles.detailValue}>{user.id}</span>
                                </div>
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>Email</span>
                                  <span className={styles.detailValue}>{user.email || "Not set"}</span>
                                </div>
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>Full Wallet Address</span>
                                  <span className={styles.detailValue}>{user.address || "Not connected"}</span>
                                </div>
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>Bio</span>
                                  <span className={styles.detailValue}>{user.bio || "No bio"}</span>
                                </div>
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>Twitter</span>
                                  <span className={styles.detailValue}>{user.twitter || "—"}</span>
                                </div>
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>Instagram</span>
                                  <span className={styles.detailValue}>{user.instagram || "—"}</span>
                                </div>
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>Website</span>
                                  <span className={styles.detailValue}>{user.website || "—"}</span>
                                </div>
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>NFTs Owned</span>
                                  <span className={styles.detailValue}>{user._count.nfts}</span>
                                </div>
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>Collections</span>
                                  <span className={styles.detailValue}>{user._count.collections}</span>
                                </div>
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>Activities</span>
                                  <span className={styles.detailValue}>{user._count.activities}</span>
                                </div>
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>Last Updated</span>
                                  <span className={styles.detailValue}>{new Date(user.updatedAt).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className={styles.emptyState}>
                  <Users size={40} />
                  <p>No users found</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ============ NFTs ============ */}
        {activeTab === "nfts" && (
          <>
            <div className={styles.sectionHeader}>
              <h2>All NFTs ({nftsTotal})</h2>
              <div className={styles.searchBar}>
                <Search size={16} />
                <input
                  placeholder="Search by name, token ID, or owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>NFT</th>
                    <th>Token ID</th>
                    <th>Owner</th>
                    <th>Collection</th>
                    <th>Price</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNfts.map((nft) => (
                    <tr key={nft.id} className={styles.row}>
                      <td>
                        <div className={styles.userCell}>
                          <div className={styles.nftThumb}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={nft.imageUrl} alt={nft.name} />
                          </div>
                          <span>{nft.name}</span>
                        </div>
                      </td>
                      <td className={styles.monoCell}>{nft.tokenId}</td>
                      <td>{nft.owner?.email || nft.owner?.username || nft.ownerAddress?.slice(0, 8) + "..."}</td>
                      <td>{nft.collection?.name || "—"}</td>
                      <td>
                        {nft.listings.length > 0
                          ? `${nft.listings[0].price} ETH`
                          : "Not listed"}
                      </td>
                      <td>{new Date(nft.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className={`${styles.actionBtn} ${styles.dangerBtn}`}
                          onClick={() => handleDeleteNft(nft.id)}
                          title="Delete NFT"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredNfts.length === 0 && (
                <div className={styles.emptyState}>
                  <ImageIcon size={40} />
                  <p>No NFTs found</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ============ Activity Log ============ */}
        {activeTab === "activity" && (
          <>
            <div className={styles.sectionHeader}>
              <h2>Recent Activity</h2>
            </div>

            <div className={styles.activityList}>
              {activities.map((act) => (
                <div key={act.id} className={styles.activityItem}>
                  <div className={styles.activityDot} data-type={act.type} />
                  <div className={styles.activityInfo}>
                    <span className={styles.activityType}>{act.type}</span>
                    <span className={styles.activityDetail}>
                      {act.nft?.name || "Unknown NFT"} — by {act.user?.email || act.user?.username || "Unknown"}
                    </span>
                    {act.price && <span className={styles.activityPrice}>{act.price} ETH</span>}
                  </div>
                  <span className={styles.activityTime}>
                    {new Date(act.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
              {activities.length === 0 && (
                <div className={styles.emptyState}>
                  <Activity size={40} />
                  <p>No activity recorded yet</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ============ Database ============ */}
        {activeTab === "database" && (
          <>
            <div className={styles.sectionHeader}>
              <h2>Database Overview</h2>
            </div>

            <div className={styles.dbGrid}>
              <div className={styles.dbCard}>
                <h3>Users Table</h3>
                <p className={styles.dbCount}>{usersTotal} records</p>
                <p className={styles.dbDesc}>Stores all user accounts, credentials, profile data, and roles.</p>
                <div className={styles.dbFields}>
                  <span>id</span><span>email</span><span>passwordHash</span><span>username</span><span>address</span>
                  <span>role</span><span>bio</span><span>avatarUrl</span><span>twitter</span><span>instagram</span>
                  <span>website</span><span>createdAt</span><span>updatedAt</span>
                </div>
              </div>

              <div className={styles.dbCard}>
                <h3>NFT Table</h3>
                <p className={styles.dbCount}>{nftsTotal} records</p>
                <p className={styles.dbDesc}>All minted NFTs with metadata, ownership, and collection info.</p>
                <div className={styles.dbFields}>
                  <span>id</span><span>tokenId</span><span>contractAddress</span><span>ownerAddress</span>
                  <span>name</span><span>description</span><span>imageUrl</span><span>metadataUrl</span>
                  <span>attributes</span><span>createdAt</span>
                </div>
              </div>

              <div className={styles.dbCard}>
                <h3>Listing Table</h3>
                <p className={styles.dbCount}>{stats?.totalListings || 0} records</p>
                <p className={styles.dbDesc}>Active and historical marketplace listings.</p>
                <div className={styles.dbFields}>
                  <span>id</span><span>listingId</span><span>type</span><span>status</span>
                  <span>price</span><span>startTime</span><span>endTime</span><span>nftId</span>
                </div>
              </div>

              <div className={styles.dbCard}>
                <h3>Collection Table</h3>
                <p className={styles.dbCount}>{stats?.totalCollections || 0} records</p>
                <p className={styles.dbDesc}>NFT collections with contract addresses and creator info.</p>
                <div className={styles.dbFields}>
                  <span>id</span><span>contractAddress</span><span>chainId</span><span>name</span>
                  <span>symbol</span><span>description</span><span>imageUrl</span><span>creatorAddress</span>
                </div>
              </div>

              <div className={styles.dbCard}>
                <h3>Activity Table</h3>
                <p className={styles.dbCount}>{activities.length}+ records</p>
                <p className={styles.dbDesc}>Audit log of all platform events (mints, sales, transfers, etc.)</p>
                <div className={styles.dbFields}>
                  <span>id</span><span>type</span><span>txHash</span><span>price</span>
                  <span>fromAddress</span><span>toAddress</span><span>nftId</span><span>userId</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <AlertTriangle size={40} className={styles.warningIcon} />
            <h3>Delete User?</h3>
            <p>This will permanently delete this user and all their associated NFTs, collections, listings, and activity. This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setConfirmDelete(null)}>
                Cancel
              </button>
              <button className={styles.confirmDeleteBtn} onClick={() => handleDeleteUser(confirmDelete)}>
                <Trash2 size={14} /> Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
