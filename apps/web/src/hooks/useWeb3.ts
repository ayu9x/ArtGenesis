"use client";

import { useState, useEffect } from "react";
import { BrowserProvider, Contract, parseEther, formatEther } from "ethers";

// ABI for the relevant Marketplace functions
const MARKETPLACE_ABI = [
  "function buy(uint256 listingId) external payable",
  "function makeOffer(uint256 listingId) external payable",
  "function acceptOffer(uint256 listingId, address offerer) external",
  "function cancelOffer(uint256 listingId) external"
];

// Provide your actual deployed contract address here later
const MARKETPLACE_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export function useWeb3() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [marketplace, setMarketplace] = useState<Contract | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== "undefined" && window.ethereum) {
      // @ts-ignore
      const browserProvider = new BrowserProvider(window.ethereum);
      setProvider(browserProvider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      setError("Please install MetaMask to use this feature.");
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      // Request account access
      // @ts-ignore
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);

      // Initialize the contract
      const contract = new Contract(MARKETPLACE_ADDRESS, MARKETPLACE_ABI, signer);
      setMarketplace(contract);
    } catch (err: any) {
      console.error("Connection error:", err);
      setError(err.message || "Failed to connect wallet.");
    } finally {
      setIsConnecting(false);
    }
  };

  const buyNow = async (listingId: string, priceEth: string) => {
    if (!marketplace) throw new Error("Wallet not connected");
    const tx = await marketplace.buy(listingId, {
      value: parseEther(priceEth)
    });
    return tx.wait(); // Wait for transaction confirmation
  };

  const makeOffer = async (listingId: string, offerEth: string) => {
    if (!marketplace) throw new Error("Wallet not connected");
    const tx = await marketplace.makeOffer(listingId, {
      value: parseEther(offerEth)
    });
    return tx.wait();
  };

  return {
    connectWallet,
    buyNow,
    makeOffer,
    address,
    isConnecting,
    error,
    provider
  };
}
