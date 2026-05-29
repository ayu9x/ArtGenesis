"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import styles from "./page.module.css";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thanks for reaching out! We will get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className={styles.meshBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <MessageSquare size={16} />
            <span>Get in Touch</span>
          </div>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            Have questions about ArtGenesis? We&apos;d love to hear from you.
            Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className={styles.content}>
          {/* Contact Details */}
          <div className={styles.infoCard}>
            <h2 className={styles.cardTitle}>Contact Information</h2>
            <p className={styles.cardSubtitle}>
              Reach out to us directly through any of these channels.
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={20} />
                </div>
                <div>
                  <p className={styles.infoLabel}>Email</p>
                  <p className={styles.infoValue}>support@artgenesis.io</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Phone size={20} />
                </div>
                <div>
                  <p className={styles.infoLabel}>Phone</p>
                  <p className={styles.infoValue}>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <MapPin size={20} />
                </div>
                <div>
                  <p className={styles.infoLabel}>Office</p>
                  <p className={styles.infoValue}>
                    120 Web3 Avenue, Suite 404<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="firstName" className={styles.label}>First Name</label>
                  <input type="text" id="firstName" className={styles.input} placeholder="John" required />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="lastName" className={styles.label}>Last Name</label>
                  <input type="text" id="lastName" className={styles.input} placeholder="Doe" required />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email Address</label>
                <input type="email" id="email" className={styles.input} placeholder="john@example.com" required />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <select id="subject" className={styles.select} required>
                  <option value="">Select a topic...</option>
                  <option value="support">General Support</option>
                  <option value="partnerships">Partnerships</option>
                  <option value="press">Press & Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea id="message" className={styles.textarea} rows={5} placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
