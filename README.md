# ArtGenesis NFT Marketplace

ArtGenesis is a next-generation full-stack Web3 NFT marketplace designed to empower digital creators and collectors. This platform provides a seamless, non-custodial trading experience with built-in royalty protection, real-time analytics, and premium aesthetics.

## 🌟 Key Features

- **Decentralized Trading**: Non-custodial Smart Contracts built on OpenZeppelin V5 standards for secure, trustless swaps.
- **Creator Royalties**: First-class support for ERC2981, ensuring creators get paid fairly on every secondary sale.
- **Gas Optimized**: Designed with Hardhat and optimized for the EVM (Cancun upgrade).
- **Scalable Architecture**: Monorepo structure powered by Turborepo, featuring a Next.js App Router frontend and a NestJS backend.
- **Secure Authentication**: Wallet-based authentication utilizing Sign-In with Ethereum (SIWE).
- **Creator Dashboards**: Real-time analytics, portfolio management, and advanced profile customization.

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript, TailwindCSS, Lucide-React.
- **Backend API**: NestJS, TypeScript, Prisma ORM, PostgreSQL, Redis.
- **Smart Contracts**: Solidity ^0.8.24, Hardhat, OpenZeppelin.
- **DevOps**: Docker, Turborepo, GitHub Actions.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+)
- npm (v10+)
- Docker & Docker Compose (for local database)

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Local Database**
   ```bash
   docker-compose up -d
   ```

3. **Configure Environment Variables**
   Duplicate `.env.example` and rename to `.env`. Fill in the required API keys and database strings.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   This will start both the Next.js frontend (`localhost:3000`) and the NestJS backend API (`localhost:3001`).

### Smart Contracts

To compile and test the Ethereum Smart Contracts:

```bash
cd packages/contracts
npm run build
npx hardhat test
```

## 📂 Project Structure

```text
├── apps/
│   ├── api/          # NestJS Backend Application
│   └── web/          # Next.js Frontend Application
├── packages/
│   ├── contracts/    # Hardhat Solidity Workspace
├── docker-compose.yml
├── turbo.json
└── package.json
```

## 🛡️ Security

This project employs best practices in smart contract security, including reentrancy guards, pull-over-push payment patterns, and immutable parameter configurations. However, this repository is provided as-is and has not yet undergone an external professional audit. Please use caution before deploying to mainnet with significant liquidity.

## 📄 License

MIT License. See the LICENSE file for details.
