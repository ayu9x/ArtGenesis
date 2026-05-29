import React from "react";
import Link from "next/link";
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles, Code, Palette, Megaphone } from "lucide-react";
import styles from "./page.module.css";

const OPEN_POSITIONS = [
  {
    id: "1",
    title: "Senior Smart Contract Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    icon: <Code size={24} />,
    description: "Lead the development of next-generation NFT auction mechanisms and marketplace infrastructure."
  },
  {
    id: "2",
    title: "Product Designer (Web3)",
    department: "Design",
    location: "New York / Remote",
    type: "Full-time",
    icon: <Palette size={24} />,
    description: "Shape the future of digital art trading by creating intuitive, stunning interfaces."
  },
  {
    id: "3",
    title: "Community Manager",
    department: "Marketing",
    location: "Remote (EMEA/APAC)",
    type: "Contract",
    icon: <Megaphone size={24} />,
    description: "Grow and nurture our global community of artists and collectors on Discord and Twitter."
  }
];

export default function CareersPage() {
  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className={styles.meshBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>Join Our Mission</span>
          </div>
          <h1 className={styles.title}>
            Build the Future of <br />
            <span className={styles.gradientText}>Digital Ownership</span>
          </h1>
          <p className={styles.subtitle}>
            We&apos;re a team of creators, engineers, and dreamers decentralizing the art world. 
            Come help us build the most beautiful NFT marketplace on the blockchain.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.statBox}>
              <h3 className={styles.statValue}>100%</h3>
              <p className={styles.statLabel}>Remote First</p>
            </div>
            <div className={styles.statBox}>
              <h3 className={styles.statValue}>Unlimited</h3>
              <p className={styles.statLabel}>PTO Policy</p>
            </div>
            <div className={styles.statBox}>
              <h3 className={styles.statValue}>Web3</h3>
              <p className={styles.statLabel}>Native Culture</p>
            </div>
          </div>
        </section>

        {/* Open Roles Section */}
        <section className={styles.rolesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Open Roles</h2>
            <p className={styles.sectionSubtitle}>Don&apos;t see a perfect fit? Send your resume to <strong>careers@artgenesis.io</strong></p>
          </div>

          <div className={styles.jobsList}>
            {OPEN_POSITIONS.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobHeader}>
                  <div className={styles.jobIconWrapper}>
                    {job.icon}
                  </div>
                  <div className={styles.jobInfo}>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <div className={styles.jobTags}>
                      <span className={styles.tag}>
                        <Briefcase size={14} /> {job.department}
                      </span>
                      <span className={styles.tag}>
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span className={styles.tag}>
                        <Clock size={14} /> {job.type}
                      </span>
                    </div>
                  </div>
                </div>
                <p className={styles.jobDescription}>{job.description}</p>
                <div className={styles.jobFooter}>
                  <Link href={`/careers/${job.id}`} className={styles.applyButton}>
                    Apply Now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
