"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Clock, Upload, Send, CheckCircle2 } from "lucide-react";
import styles from "./page.module.css";
import { useParams } from "next/navigation";

const JOB_DETAILS: Record<string, any> = {
  "1": {
    title: "Senior Smart Contract Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    about: "We are looking for an experienced smart contract engineer to lead the development of our next-generation NFT auction mechanisms and marketplace infrastructure. You will be writing secure, gas-efficient Solidity code that handles millions of dollars in transaction volume.",
    requirements: [
      "4+ years of software engineering experience",
      "2+ years of production experience with Solidity and EVM chains",
      "Deep understanding of the ERC721 and ERC1155 standards",
      "Experience with Hardhat, Foundry, and Ethers.js",
      "Strong background in smart contract security patterns and auditing"
    ]
  },
  "2": {
    title: "Product Designer (Web3)",
    department: "Design",
    location: "New York / Remote",
    type: "Full-time",
    about: "Shape the future of digital art trading by creating intuitive, stunning interfaces. You will work closely with engineering and product to translate complex Web3 concepts into seamless user experiences that delight our collectors and artists.",
    requirements: [
      "3+ years of product design experience (UI/UX)",
      "Strong portfolio demonstrating premium, consumer-facing designs",
      "Proficiency in Figma and interactive prototyping",
      "Passion for Web3, NFTs, and digital art",
      "Experience creating and maintaining design systems"
    ]
  },
  "3": {
    title: "Community Manager",
    department: "Marketing",
    location: "Remote (EMEA/APAC)",
    type: "Contract",
    about: "Grow and nurture our global community of artists and collectors. You will be the voice of ArtGenesis on Discord and Twitter, organizing events, managing ambassadors, and driving engagement.",
    requirements: [
      "2+ years of community management in Web3/Crypto",
      "Deep understanding of NFT culture and Twitter/Discord dynamics",
      "Excellent written and verbal communication skills",
      "Ability to work independently across different time zones",
      "Experience running community campaigns and AMAs"
    ]
  }
};

export default function JobApplicationPage() {
  const params = useParams();
  const id = params.id as string;
  const job = JOB_DETAILS[id];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState("");

  if (!job) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Job Not Found</h1>
          <Link href="/careers" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Careers
          </Link>
        </main>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      {/* Background Decor */}
      <div className={styles.meshBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <main className={styles.main}>
        <Link href="/careers" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Open Roles
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>{job.title}</h1>
          <div className={styles.jobTags}>
            <span className={styles.tag}>
              <Briefcase size={16} /> {job.department}
            </span>
            <span className={styles.tag}>
              <MapPin size={16} /> {job.location}
            </span>
            <span className={styles.tag}>
              <Clock size={16} /> {job.type}
            </span>
          </div>
        </div>

        <div className={styles.content}>
          {/* Job Details */}
          <div className={styles.detailsCard}>
            <h2 className={styles.sectionTitle}>About the Role</h2>
            <p className={styles.paragraph}>{job.about}</p>

            <h2 className={styles.sectionTitle}>What You&apos;ll Need</h2>
            <ul className={styles.list}>
              {job.requirements.map((req: string, idx: number) => (
                <li key={idx} className={styles.listItem}>{req}</li>
              ))}
            </ul>
            
            <h2 className={styles.sectionTitle}>Benefits</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>Competitive salary and equity (or token package)</li>
              <li className={styles.listItem}>100% remote work with flexible hours</li>
              <li className={styles.listItem}>Unlimited PTO policy</li>
              <li className={styles.listItem}>Annual team offsites</li>
              <li className={styles.listItem}>Health, dental, and vision insurance</li>
            </ul>
          </div>

          {/* Application Form */}
          <div className={styles.formCard}>
            {isSuccess ? (
              <div className={styles.successState}>
                <CheckCircle2 size={48} className={styles.successIcon} />
                <h2 className={styles.successTitle}>Application Submitted!</h2>
                <p className={styles.successMessage}>
                  Thank you for applying to the {job.title} role. Our team will review your application and get back to you soon!
                </p>
                <Link href="/careers" className={styles.submitButton} style={{ textDecoration: 'none' }}>
                  Return to Careers
                </Link>
              </div>
            ) : (
              <>
                <h2 className={styles.formTitle}>Submit Your Application</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="resume" className={styles.label}>Resume / CV *</label>
                    <div className={styles.fileUploadWrapper}>
                      <input 
                        type="file" 
                        id="resume" 
                        accept=".pdf,.doc,.docx"
                        className={styles.fileInput} 
                        onChange={handleFileUpload}
                        required 
                      />
                      <div className={styles.fileUploadUI}>
                        <Upload size={20} />
                        <span>{fileName ? fileName : "Click to upload or drag and drop"}</span>
                        {!fileName && <span className={styles.fileHint}>PDF, DOC, DOCX (Max 5MB)</span>}
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="firstName" className={styles.label}>First Name *</label>
                      <input type="text" id="firstName" className={styles.input} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="lastName" className={styles.label}>Last Name *</label>
                      <input type="text" id="lastName" className={styles.input} required />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address *</label>
                    <input type="email" id="email" className={styles.input} required />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="portfolio" className={styles.label}>Portfolio / LinkedIn URL</label>
                    <input type="url" id="portfolio" className={styles.input} placeholder="https://" />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="coverLetter" className={styles.label}>Cover Letter (Optional)</label>
                    <textarea id="coverLetter" className={styles.textarea} rows={4} placeholder="Why are you a great fit for this role?"></textarea>
                  </div>

                  <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : (
                      <>
                        Submit Application <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
