"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ComingSoon({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", textAlign: "center", padding: "2rem", paddingTop: "120px" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontFamily: "var(--font-display)" }}>{title}</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: "600px" }}>
        We're working hard to bring you this feature. Check back soon for updates!
      </p>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "var(--bg-tertiary)", color: "var(--text-primary)", borderRadius: "8px", textDecoration: "none", fontWeight: 600 }}>
        <ArrowLeft size={18} /> Back to Home
      </Link>
    </div>
  );
}
