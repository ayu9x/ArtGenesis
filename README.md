# ArtGenesis 🎨✨

**ArtGenesis** is a modern, comprehensive decentralized NFT marketplace and Web3 ecosystem designed to build the future of digital ownership. 

Our mission is to decentralize the art world, providing creators, engineers, and dreamers with the most beautiful, functional, and secure platform to mint, trade, and discover digital assets.

---

## 🚀 Tool Features

ArtGenesis comes packed with cutting-edge features for both users and developers:

* **Collapsible Hover Sidebar:** An intelligent, auto-hiding sidebar that provides deep navigation (Discover, Collections, Tokens, Swap, Drops, Activity, Rewards, Studio) while staying entirely out of the way for maximum screen real-estate.
* **Full Admin Dashboard:** Secure, role-based platform management portal with deep statistics, activity tracking (logins, signups, mints), real-time user management, and dynamic database insights.
* **Complex Dashboard UIs:** Premium, highly-dense data layouts similar to top-tier crypto exchanges, featuring interactive SVGs, CSS grids, gradient text, and live statistics.
* **Modular Dropdown Navigations:** Clean, structured sub-menus (Profile, Resources, Settings) managed securely within the client state.
* **Integrated Web3 Stack:** Seamless connections between a frontend marketplace, a dedicated indexing backend, and Ethereum-compatible Smart Contracts.
* **Responsive & Adaptive:** Fully responsive CSS-Modules-based styling that works beautifully on desktop, tablet, and mobile browsers.

---

## 🛠 Tools & Tech Stack

### 1. Frontend (`apps/web`)
* **Next.js 14+ (App Router):** Fast, SEO-friendly, server-rendered React framework.
* **React 18:** Modern UI library.
* **TypeScript:** Strictly typed JavaScript for enterprise-grade reliability.
* **CSS Modules:** Scoped, clash-free, and hyper-performant styling relying on native CSS.
* **Lucide React:** Clean, beautiful SVG icons.

### 2. Backend API (`apps/api`)
* **NestJS:** Progressive Node.js framework building efficient, reliable, and scalable server-side applications.
* **Prisma:** Next-generation Node.js and TypeScript ORM.
* **SQLite / PostgreSQL:** Configurable database systems for dev and prod.
* **TypeScript:** Full end-to-end type safety between frontend and backend.

### 3. Smart Contracts (`packages/contracts`)
* **Hardhat:** Ethereum development environment for compiling, deploying, testing, and debugging software.
* **Solidity:** Object-oriented programming language for writing smart contracts.
* **OpenZeppelin:** Secure, standard-compliant library for Ethereum smart contract development.

### 4. Monorepo Infrastructure
* **Turborepo:** High-performance build system for JavaScript and TypeScript codebases.
* **Docker / Docker Compose:** Containerization for isolated, reproducible backend databases and services.
* **npm:** Node package manager for monorepo workspace hoisting.

---

## 📁 Full Folder Structure

```text
ArtGenesis/
│
├── apps/
│   ├── web/                     # The Next.js Frontend Application
│   │   ├── public/              # Static assets (images, nft mockups, icons)
│   │   ├── src/
│   │   │   ├── app/             # Next.js App Router (pages, layouts, globals.css)
│   │   │   │   ├── activity/    # Activity Feed page
│   │   │   │   ├── collections/ # Collections browser
│   │   │   │   ├── create/      # NFT Minting Studio interface
│   │   │   │   ├── drops/       # Exclusive NFT drops calendar
│   │   │   │   ├── marketplace/ # Live NFT marketplace trading
│   │   │   │   ├── profile/     # User portfolio, wallet, and settings
│   │   │   │   ├── settings/    # Deep user configuration menus
│   │   │   │   ├── studio/      # Creator Studio and management
│   │   │   │   ├── swap/        # Token swapping interface
│   │   │   │   └── tokens/      # ERC-20 / ERC-721 token tracker
│   │   │   └── components/      # Reusable React components
│   │   │       ├── layout/      # Navbar, Footer, and the Collapsible Sidebar
│   │   │       └── nft/         # NFT Cards, Grids, and Web3 UI blocks
│   │   ├── next.config.ts       # Next.js build configuration
│   │   └── package.json         # Frontend dependencies
│   │
│   └── api/                     # The NestJS Backend API
│       ├── prisma/              # Prisma schema and SQLite Dev DB
│       ├── src/
│       │   ├── auth/            # Web3 authentication controllers/services
│       │   ├── nft/             # NFT metadata and indexing services
│       │   └── main.ts          # API entry point
│       └── package.json         # Backend dependencies
│
├── packages/
│   └── contracts/               # The Hardhat Web3 Project
│       ├── contracts/           # Solidity files (ArtGenesisNFT.sol, Marketplace.sol)
│       ├── scripts/             # Deployment and interaction scripts
│       ├── test/                # Smart contract test suites
│       └── hardhat.config.ts    # Blockchain network configurations
│
├── docker-compose.yml           # Local infrastructure definition (DBs, Caches)
├── turbo.json                   # Turborepo caching and pipeline definitions
├── vercel.json                  # Frontend hosting configuration
├── railway.toml                 # Backend hosting configuration
└── package.json                 # Monorepo root workspace
```

---

## 🏁 How to Start (Local Development)

### Prerequisites
Make sure you have installed:
* **Node.js** (v18.x or newer recommended)
* **npm** (v9.x or newer)
* **Docker** (Optional, but recommended for spinning up PostgreSQL/Redis local instances)

### 1. Installation

Clone the repository and install dependencies at the monorepo root:

```bash
git clone https://github.com/your-username/ArtGenesis.git
cd ArtGenesis

# Install all packages across apps and contracts
npm install
```

### 2. Environment Variables

Create `.env` files based on the examples. Run this at the root:

```bash
cp .env.example .env
```
*(Ensure you do this inside `apps/web` and `apps/api` if they have specific `.env.example` files as well).*

### 3. Smart Contract Deployment (Local)

To run the local blockchain and deploy the Marketplace and NFT contracts:

```bash
# Open a new terminal specifically for the blockchain
cd packages/contracts
npx hardhat node

# In another terminal, deploy the contracts to the local node
cd packages/contracts
npx hardhat run scripts/deploy.ts --network localhost
```

### 4. Running the Development Servers

Thanks to **Turborepo**, you can boot the entire stack (Frontend + Backend) with one command from the project root:

```bash
npm run dev
```

This will concurrently start:
- 🎨 **Next.js Frontend:** `http://localhost:3000`
- ⚙️ **NestJS API:** `http://localhost:4000`

---

## 🚢 Deployment

### 1. Frontend (Vercel)
The `apps/web` folder is completely optimized for Vercel. 
1. Connect your GitHub repository to Vercel.
2. Select the Root Directory as `apps/web`.
3. Vercel will automatically detect Next.js and build the application.

*(Alternatively, use the Vercel CLI: `vercel deploy`)*

### 2. Backend (Railway / Render)
The `apps/api` contains a `railway.toml` allowing for zero-config deployments on Railway.
1. Connect your GitHub repo to Railway.
2. Railway will automatically pick up the Nest.js configuration and provision your server.

---

## 📄 License

This project is licensed under the MIT License.
