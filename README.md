# ArtGenesis 🎨✨

**ArtGenesis** is a modern, comprehensive decentralized NFT marketplace and Web3 ecosystem designed to build the future of digital ownership. 

Our mission is to decentralize the art world, providing creators, engineers, and dreamers with the most beautiful, functional, and secure platform to mint, trade, and discover digital assets.

---

## 🚀 Key Features

* **Premium User Interface:** A highly polished, dynamic Next.js frontend with stunning UI/UX, responsive design, interactive dashboards, and collapsible sidebar navigation.
* **Full-Stack Monorepo Architecture:** Seamlessly orchestrated using Turborepo to house the frontend Web app, backend API, and Smart Contracts under one roof.
* **Web3 Integration:** Secure and robust Smart Contract implementations using Hardhat and Solidity, providing trustless marketplace transactions.
* **High Performance Backend:** A dedicated NestJS API powered by Prisma to index blockchain events, handle off-chain metadata, and deliver blazing-fast searches.
* **Dynamic NFTs & Collections:** Minting interfaces, collection tracking, real-time activity feeds, and trending tokens visualization.

---

## 🛠 Tech Stack

### Frontend (`apps/web`)
* **Framework:** [Next.js 14+ (App Router)](https://nextjs.org/)
* **Language:** TypeScript
* **Styling:** CSS Modules with custom Design System tokens
* **Icons:** Lucide React

### Backend (`apps/api`)
* **Framework:** [NestJS](https://nestjs.com/)
* **Database / ORM:** SQLite (Dev) / PostgreSQL (Prod) via [Prisma](https://www.prisma.io/)
* **Language:** TypeScript

### Smart Contracts (`packages/contracts`)
* **Framework:** [Hardhat](https://hardhat.org/)
* **Language:** Solidity
* **Libraries:** OpenZeppelin Contracts

### Tooling
* **Monorepo Management:** [Turborepo](https://turbo.build/)
* **Package Manager:** npm

---

## 📁 Project Structure

```text
ArtGenesis/
├── apps/
│   ├── web/               # Next.js frontend application
│   └── api/               # NestJS backend service
├── packages/
│   └── contracts/         # Hardhat project with Solidity smart contracts
├── turbo.json             # Turborepo configuration
├── docker-compose.yml     # Docker setup for local infrastructure
└── package.json           # Root workspace configuration
```

---

## 🏁 Getting Started

### Prerequisites
* Node.js (v18+)
* npm (v9+)
* Docker (Optional, for running local DB)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ArtGenesis.git
   cd ArtGenesis
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy the example environment files for both apps:
   ```bash
   cp .env.example .env
   ```

### Running Locally

You can leverage Turborepo to run the entire stack with a single command:

```bash
npm run dev
```

This will concurrently start:
- The Next.js frontend on `http://localhost:3000`
- The NestJS API on `http://localhost:4000`
- (If configured) The local Hardhat blockchain node

*Alternatively, run individual apps:*
```bash
# Frontend only
npm run dev --filter=web

# Backend only
npm run dev --filter=api
```

---

## ⛓️ Smart Contracts

To compile and deploy the smart contracts to a local node:

```bash
cd packages/contracts
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.ts --network localhost
```

---

## 🚢 Deployment

### Frontend (Vercel)
The `apps/web` application is optimized for Vercel deployment. A `vercel.json` configuration is included.
```bash
vercel deploy
```

### Backend (Railway / Render)
The `apps/api` can be deployed using Docker or a Node.js runtime. A `railway.toml` is included for zero-config Railway deployments.

---

## 📄 License

This project is licensed under the MIT License.
