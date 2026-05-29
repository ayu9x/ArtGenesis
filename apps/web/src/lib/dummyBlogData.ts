export const CATEGORIES = ["All", "Platform Updates", "Creator Spotlight", "Market Insights", "Tutorials"];

export const BLOG_POSTS = [
  {
    id: "1",
    title: "ArtGenesis V2 is Live: Faster, Cheaper, Better",
    category: "Platform Updates",
    author: "Ayush Raj",
    date: "May 28, 2026",
    summary: "Today we are thrilled to announce the rollout of ArtGenesis V2, featuring a completely rewritten smart contract architecture that reduces gas fees by 40% and introduces batch minting.",
    readTime: "4 min read",
    featured: true,
    content: [
      "Today we are thrilled to announce the rollout of ArtGenesis V2, featuring a completely rewritten smart contract architecture that reduces gas fees by 40% and introduces batch minting.",
      "When we started ArtGenesis, our goal was to decentralize the art world. But high gas fees on Ethereum Mainnet meant that many emerging artists were priced out of minting their own work.",
      "With V2, we have migrated our core registry to a highly optimized proxy pattern. This means artists can now mint collections of up to 10,000 items for a fraction of the cost.",
      "We've also completely revamped the UI, introducing a new glassmorphic design language that puts the art front and center. Go check it out on the create page today!"
    ]
  },
  {
    id: "2",
    title: "How to Price Your First NFT Collection",
    category: "Tutorials",
    author: "Priyanshu Sharma",
    date: "May 22, 2026",
    summary: "Pricing digital art is more art than science, but there are frameworks you can use to ensure you capture value while remaining accessible to early collectors.",
    readTime: "7 min read",
    featured: false,
    content: [
      "Pricing digital art is more art than science, but there are frameworks you can use to ensure you capture value while remaining accessible to early collectors.",
      "The biggest mistake new artists make is pricing their genesis collection too high. Remember that in Web3, community is everything. Your first collectors are your biggest advocates.",
      "We recommend pricing your first pieces in the 0.05 ETH to 0.1 ETH range. This creates a low barrier to entry and encourages secondary market trading.",
      "Always set an enforceable royalty on ArtGenesis (we recommend 10%). If your art appreciates in value, you will continually capture the upside of that growth."
    ]
  },
  {
    id: "3",
    title: "Creator Spotlight: The Vision Behind 'Neon Dreams'",
    category: "Creator Spotlight",
    author: "Elena Rostova",
    date: "May 15, 2026",
    summary: "We sat down with digital artist @CyberPainter to discuss their latest 100-piece collection, the inspiration drawn from 80s synthwave, and why they chose ArtGenesis.",
    readTime: "10 min read",
    featured: false,
    content: [
      "We sat down with digital artist @CyberPainter to discuss their latest 100-piece collection, the inspiration drawn from 80s synthwave, and why they chose ArtGenesis.",
      "'Neon Dreams is a reflection of the digital dystopia we currently inhabit,' CyberPainter explained. 'I wanted to capture the contrast between high technology and low quality of life.'",
      "The collection sold out in under 4 minutes on ArtGenesis, generating over 50 ETH in primary sales.",
      "'The ArtGenesis launchpad made it so incredibly easy. I didn't have to write a single line of Solidity. I just uploaded my layers and let the platform handle the rest.'"
    ]
  },
  {
    id: "4",
    title: "Q2 2026: The Resurgence of Generative Art",
    category: "Market Insights",
    author: "Marcus Chen",
    date: "May 02, 2026",
    summary: "An analysis of trading volumes across major marketplaces shows a massive 300% spike in algorithmic art. What is driving this sudden demand?",
    readTime: "6 min read",
    featured: false,
    content: [
      "An analysis of trading volumes across major marketplaces shows a massive 300% spike in algorithmic art. What is driving this sudden demand?",
      "Generative art has a unique value proposition in Web3. The code itself is the art, and the blockchain is the canvas. Collectors are beginning to realize the historical significance of fully on-chain SVG outputs.",
      "We predict that by the end of the year, generative art will flip PFPs in total market capitalization."
    ]
  },
  {
    id: "5",
    title: "Introducing Flexible Royalties (EIP-2981)",
    category: "Platform Updates",
    author: "Ayush Raj",
    date: "April 18, 2026",
    summary: "We believe creators should always get paid. Here is how our new integration with the EIP-2981 standard ensures your royalties follow your art across all major marketplaces.",
    readTime: "5 min read",
    featured: false,
    content: [
      "We believe creators should always get paid. Here is how our new integration with the EIP-2981 standard ensures your royalties follow your art across all major marketplaces.",
      "Before EIP-2981, royalties were platform-specific. If you minted on Platform A and your NFT was sold on Platform B, you received nothing.",
      "Now, the royalty configuration is baked directly into the smart contract itself. No matter where your NFT is traded, the ArtGenesis contract ensures the royalty is pulled and sent to your wallet."
    ]
  },
  {
    id: "6",
    title: "Top 5 Mistakes New NFT Collectors Make",
    category: "Tutorials",
    author: "Elena Rostova",
    date: "April 05, 2026",
    summary: "From losing seed phrases to FOMO bidding, learn how to protect yourself and build a high-quality portfolio of digital assets safely.",
    readTime: "8 min read",
    featured: false,
    content: [
      "From losing seed phrases to FOMO bidding, learn how to protect yourself and build a high-quality portfolio of digital assets safely.",
      "1. Never store your seed phrase digitally. Write it down on paper.\n2. Don't FOMO into mints you haven't researched.\n3. Use a hardware wallet for your most valuable assets.\n4. Always double-check the smart contract address on Etherscan.\n5. Don't click on links in Discord DMs."
    ]
  },
  {
    id: "7",
    title: "Creator Spotlight: 'Echoes of Silence' by Amara",
    category: "Creator Spotlight",
    author: "Ayush Raj",
    date: "March 22, 2026",
    summary: "Amara's latest photography collection 'Echoes of Silence' sold out instantly. We talk about her transition from traditional gallery exhibits to Web3.",
    readTime: "9 min read",
    featured: false,
    content: [
      "Amara's latest photography collection 'Echoes of Silence' sold out instantly. We talk about her transition from traditional gallery exhibits to Web3.",
      "As a traditional photographer for 15 years, Amara struggled with the gallery system taking a 50% cut of her work.",
      "'Web3 gave me my independence back,' she says. 'Now I connect directly with my collectors and retain 100% of my primary sales.'",
      "Check out her full collection on the ArtGenesis marketplace."
    ]
  },
  {
    id: "8",
    title: "Understanding Layer 2 Scaling on Polygon",
    category: "Market Insights",
    author: "Priyanshu Sharma",
    date: "March 10, 2026",
    summary: "Why did ArtGenesis choose Polygon for its V2 rollout? A technical breakdown of Zero-Knowledge rollups and the future of cheap transactions.",
    readTime: "12 min read",
    featured: false,
    content: [
      "Why did ArtGenesis choose Polygon for its V2 rollout? A technical breakdown of Zero-Knowledge rollups and the future of cheap transactions.",
      "As Ethereum Mainnet became congested, we knew we needed a scaling solution that didn't compromise on security.",
      "Polygon's ZK-EVM provides Ethereum-equivalent security with sub-cent transaction fees. This fundamentally changes what is possible for micro-transactions and low-cost minting."
    ]
  },
  {
    id: "9",
    title: "How to Build a Discord Community for Your NFT Drop",
    category: "Tutorials",
    author: "Marcus Chen",
    date: "February 28, 2026",
    summary: "A step-by-step guide to setting up a secure Discord server, configuring Collab.Land for token gating, and retaining your most loyal fans.",
    readTime: "15 min read",
    featured: false,
    content: [
      "A step-by-step guide to setting up a secure Discord server, configuring Collab.Land for token gating, and retaining your most loyal fans.",
      "Community is the lifeblood of any Web3 project. But managing a Discord server comes with immense security risks.",
      "First rule: Disable DMs server-wide. This prevents 99% of phishing attacks on your members.",
      "Second: Use token-gated channels to reward your actual holders with alpha and exclusive drops."
    ]
  },
  {
    id: "10",
    title: "ArtGenesis Integrates WalletConnect V2",
    category: "Platform Updates",
    author: "Elena Rostova",
    date: "February 14, 2026",
    summary: "Mobile collectors rejoice! You can now seamlessly connect over 100+ different mobile wallets to ArtGenesis using the latest WalletConnect standard.",
    readTime: "3 min read",
    featured: false,
    content: [
      "Mobile collectors rejoice! You can now seamlessly connect over 100+ different mobile wallets to ArtGenesis using the latest WalletConnect standard.",
      "With V2, connections are significantly more stable, and multi-chain support is built in natively.",
      "Simply tap 'Connect Wallet', scan the QR code with your mobile app, and you're ready to start collecting."
    ]
  }
];
