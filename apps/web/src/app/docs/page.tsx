"use client";
import React, { useState, useEffect } from "react";
import { Book, Code, Sparkles, Terminal, FileText, Search, ChevronRight } from "lucide-react";
import styles from "./page.module.css";

const DOCS_NAV = [
  {
    category: "Getting Started",
    items: ["Introduction", "Creating a Wallet", "Funding Your Account"]
  },
  {
    category: "For Creators",
    items: ["Minting Your First NFT", "Setting Royalties", "Creating Collections", "Auction Mechanics"]
  },
  {
    category: "Developers",
    items: ["Smart Contracts Overview", "API Reference", "Webhooks", "SDK Integration"]
  }
];

export default function DocsPage() {
  const [activeItem, setActiveItem] = useState("Introduction");
  
  // Pagination Logic
  const allItems = DOCS_NAV.flatMap(section => section.items);
  const currentIndex = allItems.indexOf(activeItem);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  // Scroll to top when active item changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeItem]);

  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className={styles.meshBg} />
      
      <main className={styles.main}>
        {/* Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input type="text" placeholder="Search docs..." className={styles.searchInput} />
          </div>

          <nav className={styles.nav}>
            {DOCS_NAV.map((section, idx) => (
              <div key={idx} className={styles.navSection}>
                <h3 className={styles.navCategory}>{section.category}</h3>
                <ul className={styles.navList}>
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <button 
                        className={`${styles.navItem} ${activeItem === item ? styles.navItemActive : ''}`}
                        onClick={() => setActiveItem(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className={styles.content}>
          <div className={styles.breadcrumbs}>
            <span>Docs</span> <ChevronRight size={14} /> 
            <span>
              {DOCS_NAV.find(s => s.items.includes(activeItem))?.category}
            </span> 
            <ChevronRight size={14} /> 
            <span className={styles.breadcrumbActive}>{activeItem}</span>
          </div>

          <h1 className={styles.title}>{activeItem}</h1>

          {/* DUMMY DATA FOR EACH SECTION */}
          
          {activeItem === "Introduction" && (
            <div className={styles.docBody}>
              <p className={styles.paragraph}>
                Welcome to the ArtGenesis documentation! Here you will find everything you need to know about navigating the platform, minting digital art, and integrating with our developer APIs.
              </p>
              <div className={styles.cardGrid}>
                <div className={styles.featureCard}>
                  <div className={styles.iconWrapper}><Sparkles size={20} /></div>
                  <h3>For Collectors</h3>
                  <p>Learn how to browse, bid on, and securely store your digital assets.</p>
                </div>
                <div className={styles.featureCard}>
                  <div className={styles.iconWrapper}><Book size={20} /></div>
                  <h3>For Creators</h3>
                  <p>Discover how to easily mint your art on-chain without touching code.</p>
                </div>
                <div className={styles.featureCard}>
                  <div className={styles.iconWrapper}><Code size={20} /></div>
                  <h3>For Developers</h3>
                  <p>Access our GraphQL endpoints and smart contract ABIs to build custom experiences.</p>
                </div>
              </div>
            </div>
          )}

          {activeItem === "Creating a Wallet" && (
            <div className={styles.docBody}>
              <p className={styles.paragraph}>
                To interact with ArtGenesis, you will need a Web3 wallet. A wallet acts as your digital identity and your bank account for crypto assets.
              </p>
              <h3 className={styles.subheading}>Supported Wallets</h3>
              <ul className={styles.list}>
                <li className={styles.listItem}>MetaMask (Recommended for desktop)</li>
                <li className={styles.listItem}>WalletConnect (For mobile users)</li>
                <li className={styles.listItem}>Coinbase Wallet</li>
              </ul>
              <h3 className={styles.subheading}>Step-by-step Setup</h3>
              <p className={styles.paragraph}>
                1. Download the MetaMask extension for Chrome or Brave.<br/>
                2. Follow the setup instructions and safely store your seed phrase.<br/>
                3. Click &quot;Connect Wallet&quot; in the top right corner of ArtGenesis.
              </p>
            </div>
          )}

          {activeItem === "Funding Your Account" && (
            <div className={styles.docBody}>
              <p className={styles.paragraph}>
                Before you can purchase an NFT or pay for gas fees, you need to fund your wallet with cryptocurrency.
              </p>
              <h3 className={styles.subheading}>Using Fiat On-Ramps</h3>
              <p className={styles.paragraph}>
                You can buy Ethereum (ETH) or Polygon (MATIC) directly inside ArtGenesis using your credit card via our MoonPay integration. Simply go to your profile, click &quot;Add Funds&quot;, and follow the prompts.
              </p>
              <h3 className={styles.subheading}>Transferring from an Exchange</h3>
              <p className={styles.paragraph}>
                If you already have funds on Binance, Coinbase, or Kraken, you can withdraw them directly to your wallet address. Make sure you select the correct network (Ethereum Mainnet or Polygon) to avoid losing your funds!
              </p>
            </div>
          )}

          {activeItem === "Minting Your First NFT" && (
            <div className={styles.docBody}>
              <p className={styles.paragraph}>
                Minting is the process of tokenizing your digital file (image, video, audio) and publishing it on the blockchain.
              </p>
              <h3 className={styles.subheading}>The Minting Flow</h3>
              <p className={styles.paragraph}>
                1. Navigate to the <strong>Create</strong> page.<br/>
                2. Upload your high-resolution asset.<br/>
                3. Fill in the metadata (Title, Description, Properties).<br/>
                4. Select whether you want it to be a 1/1 Edition or Multiple Editions.<br/>
                5. Confirm the transaction in your wallet.
              </p>
              <div className={styles.alertBox}>
                <strong>Note:</strong> Gas fees fluctuate. We recommend minting during off-peak hours to save on network transaction costs.
              </div>
            </div>
          )}

          {activeItem === "Setting Royalties" && (
            <div className={styles.docBody}>
              <p className={styles.paragraph}>
                ArtGenesis empowers creators by guaranteeing secondary market royalties at the smart contract level.
              </p>
              <h3 className={styles.subheading}>How it works</h3>
              <p className={styles.paragraph}>
                When you mint an NFT, you can specify a royalty percentage (typically between 5% and 15%). Every time your artwork is resold on ArtGenesis, you will automatically receive that percentage of the sale price directly to your wallet.
              </p>
            </div>
          )}

          {activeItem === "Creating Collections" && (
            <div className={styles.docBody}>
              <p className={styles.paragraph}>
                A Collection is your own dedicated smart contract (ERC-721 or ERC-1155) that acts as an umbrella for your NFTs.
              </p>
              <h3 className={styles.subheading}>Why deploy your own contract?</h3>
              <p className={styles.paragraph}>
                Deploying your own collection contract means you have ultimate provenance. The tokens will trace back to your address as the true creator, rather than a shared ArtGenesis storefront contract.
              </p>
            </div>
          )}

          {activeItem === "Auction Mechanics" && (
            <div className={styles.docBody}>
              <p className={styles.paragraph}>
                ArtGenesis supports multiple ways to sell your art. You can list it for a fixed price, or put it up for auction.
              </p>
              <h3 className={styles.subheading}>English Auctions</h3>
              <p className={styles.paragraph}>
                Also known as &quot;Highest Bidder Wins&quot;. You set a reserve price and an expiration time. If bids are placed in the last 15 minutes, the timer automatically extends by 15 minutes to prevent sniping.
              </p>
              <h3 className={styles.subheading}>Dutch Auctions</h3>
              <p className={styles.paragraph}>
                The price starts high and continuously drops over a specified period until a buyer decides the current price is right and buys it immediately.
              </p>
            </div>
          )}

          {activeItem === "Smart Contracts Overview" && (
            <div className={styles.docBody}>
              <p className={styles.paragraph}>
                ArtGenesis is powered by a suite of audited, open-source smart contracts deployed on Ethereum and Polygon.
              </p>
              <h3 className={styles.subheading}>Architecture</h3>
              <ul className={styles.list}>
                <li className={styles.listItem}><strong>Marketplace.sol:</strong> Handles all escrow, bidding, and atomic swaps.</li>
                <li className={styles.listItem}><strong>ArtGenesisNFT.sol:</strong> Our default ERC-721 factory.</li>
                <li className={styles.listItem}><strong>RoyaltyRegistry.sol:</strong> Compliant with EIP-2981 for cross-platform royalties.</li>
              </ul>
            </div>
          )}

          {activeItem === "API Reference" && (
            <div className={styles.docBody}>
              <p className={styles.paragraph}>
                The ArtGenesis REST API allows you to programmatically access marketplace data, including listings, bids, and historical sales.
              </p>
              <h3 className={styles.subheading}>Authentication</h3>
              <p className={styles.paragraph}>All requests require a Bearer token in the Authorization header.</p>
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <Terminal size={14} /> <span>bash</span>
                </div>
                <pre className={styles.code}>
{`curl -X GET "https://api.artgenesis.io/v1/collections" \\
     -H "Authorization: Bearer YOUR_API_KEY"`}
                </pre>
              </div>
              <h3 className={styles.subheading}>Response Format</h3>
              <p className={styles.paragraph}>The API consistently returns data in standard JSON format.</p>
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <FileText size={14} /> <span>json</span>
                </div>
                <pre className={styles.code}>
{`{
  "status": "success",
  "data": {
    "collections": [ ... ]
  }
}`}
                </pre>
              </div>
            </div>
          )}

          {activeItem === "Webhooks" && (
            <div className={styles.docBody}>
              <p className={styles.paragraph}>
                Subscribe to real-time events on the ArtGenesis platform using Webhooks. We can push data directly to your server when specific actions occur.
              </p>
              <h3 className={styles.subheading}>Supported Events</h3>
              <ul className={styles.list}>
                <li className={styles.listItem}><code>item.minted</code></li>
                <li className={styles.listItem}><code>item.listed</code></li>
                <li className={styles.listItem}><code>bid.placed</code></li>
                <li className={styles.listItem}><code>auction.settled</code></li>
              </ul>
              <div className={styles.alertBox}>
                <strong>Security:</strong> All webhook payloads include an X-ArtGenesis-Signature header for verifying the payload was sent by us.
              </div>
            </div>
          )}

          {activeItem === "SDK Integration" && (
            <div className={styles.docBody}>
              <p className={styles.paragraph}>
                The fastest way to build on top of ArtGenesis is by using our official TypeScript SDK.
              </p>
              <h3 className={styles.subheading}>Installation</h3>
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <Terminal size={14} /> <span>bash</span>
                </div>
                <pre className={styles.code}>
{`npm install @artgenesis/sdk`}
                </pre>
              </div>
              <h3 className={styles.subheading}>Usage Example</h3>
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <FileText size={14} /> <span>typescript</span>
                </div>
                <pre className={styles.code}>
{`import { ArtGenesisClient } from '@artgenesis/sdk';

const client = new ArtGenesisClient({ apiKey: process.env.API_KEY });
const asset = await client.getAsset("0x123...", "1");

console.log(\`Asset \${asset.name} is owned by \${asset.owner}\`);`}
                </pre>
              </div>
            </div>
          )}

          {/* Pagination Buttons */}
          <div className={styles.pagination}>
            {prevItem ? (
              <button className={styles.pageBtn} onClick={() => setActiveItem(prevItem)}>
                <ArrowLeftIcon /> Previous: {prevItem}
              </button>
            ) : (
              <div></div> // Empty div to maintain flex spacing
            )}
            
            {nextItem ? (
              <button className={styles.pageBtn} onClick={() => setActiveItem(nextItem)}>
                Next: {nextItem} <ArrowRightIcon />
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Simple icons for pagination
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
