"use client";
import React, { useState } from "react";
import { ArrowDownUp, Settings, ChevronDown } from "lucide-react";
import styles from "./page.module.css";

export default function SwapPage() {
  const [fromAmount, setFromAmount] = useState("1.0");
  const [toAmount, setToAmount] = useState("2012.45");

  return (
    <div className={styles.page}>
      <div className={styles.meshBg} />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Swap</h1>
            <button className={styles.settingsBtn}><Settings size={18} /></button>
          </div>

          {/* From */}
          <div className={styles.tokenField}>
            <div className={styles.fieldLabel}>
              <span>You pay</span>
              <span>Balance: 4.28 ETH</span>
            </div>
            <div className={styles.fieldRow}>
              <input className={styles.amountInput} value={fromAmount} onChange={e => setFromAmount(e.target.value)} placeholder="0.0" type="text" />
              <div className={styles.tokenSelect}>
                <div className={styles.tokenDot} style={{ background: "#627eea" }} />
                <span className={styles.tokenSelectName}>ETH</span>
                <ChevronDown size={16} style={{ color: "var(--text-tertiary)" }} />
              </div>
            </div>
          </div>

          {/* Swap Arrow */}
          <div className={styles.swapArrow}>
            <button className={styles.swapArrowBtn}><ArrowDownUp size={18} /></button>
          </div>

          {/* To */}
          <div className={styles.tokenField}>
            <div className={styles.fieldLabel}>
              <span>You receive</span>
              <span>Balance: 1,240 USDC</span>
            </div>
            <div className={styles.fieldRow}>
              <input className={styles.amountInput} value={toAmount} onChange={e => setToAmount(e.target.value)} placeholder="0.0" type="text" />
              <div className={styles.tokenSelect}>
                <div className={styles.tokenDot} style={{ background: "#2775ca" }} />
                <span className={styles.tokenSelectName}>USDC</span>
                <ChevronDown size={16} style={{ color: "var(--text-tertiary)" }} />
              </div>
            </div>
          </div>

          {/* Rate Info */}
          <div className={styles.rateRow}>
            <span>Rate</span>
            <span>1 ETH = 2,012.45 USDC</span>
          </div>
          <div className={styles.rateRow}>
            <span>Network Fee</span>
            <span>~$2.40</span>
          </div>
          <div className={styles.rateRow}>
            <span>Slippage</span>
            <span>0.5%</span>
          </div>

          <button className={styles.swapBtn}>Swap Tokens</button>
          <p className={styles.disclaimer}>By swapping, you agree to ArtGenesis Terms of Service.</p>
        </div>
      </div>
    </div>
  );
}
