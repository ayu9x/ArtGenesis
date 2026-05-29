"use client";
import React from "react";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import styles from "../login/page.module.css";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get form data
    const email = (document.getElementById('email') as HTMLInputElement).value;

    try {
      const res = await fetch('http://localhost:3001/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (res.ok) {
        alert(`A password reset link has been sent to ${email} (check the server console logs for the mock link!)`);
      } else {
        const err = await res.json();
        alert(`Error: ${err.message || 'Failed to send request'}`);
      }
    } catch (error) {
      alert("Failed to connect to the backend server. Make sure NestJS is running on port 3001.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className={styles.meshBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <main className={styles.main}>
        <div className={styles.authCard}>
          <div className={styles.header}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon}>A</div>
              <span className={styles.logoText}>ArtGenesis</span>
            </Link>
            <h1 className={styles.title}>Reset Password</h1>
            <p className={styles.subtitle}>Enter your email to receive a reset link</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={18} />
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Reset Link <ArrowRight size={18} />
            </button>
          </form>

          <p className={styles.footer} style={{ marginTop: "1.5rem" }}>
            <Link href="/login" className={styles.signupLink} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <ArrowLeft size={14} /> Back to Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
