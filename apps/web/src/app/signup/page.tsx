"use client";
import React from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Shield } from "lucide-react";
import styles from "../login/page.module.css";

export default function SignupPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get form data
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;

    try {
      const res = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, passwordStr: password, name })
      });
      
      if (res.ok) {
        const data = await res.json();
        // Save token to localStorage for authenticated sessions
        localStorage.setItem('auth_token', data.token);
        alert(`Account successfully created for ${email}!`);
        window.location.href = '/dashboard';
      } else {
        const err = await res.json();
        alert(`Error: ${err.message || 'Failed to sign up'}`);
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
            <h1 className={styles.title}>Create an account</h1>
            <p className={styles.subtitle}>Join the premier NFT marketplace</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Full Name</label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} size={18} />
                <input
                  type="text"
                  id="name"
                  placeholder="Satoshi Nakamoto"
                  className={styles.input}
                  required
                />
              </div>
            </div>

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

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={18} />
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign Up <ArrowRight size={18} />
            </button>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <div className={styles.socialAuth}>
            <button className={styles.googleButton}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
              Sign up with Google
            </button>
            <button className={styles.walletButton}>
              <Shield size={18} />
              Connect Web3 Wallet
            </button>
          </div>

          <p className={styles.footer}>
            Already have an account?{" "}
            <Link href="/login" className={styles.signupLink}>
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
