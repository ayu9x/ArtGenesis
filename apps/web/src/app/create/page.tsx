"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  ImagePlus,
  FileText,
  Tag,
  Layers,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Check,
  Sparkles,
  Eye,
} from "lucide-react";
import styles from "./page.module.css";

const STEPS = [
  { label: "Upload", icon: Upload },
  { label: "Details", icon: FileText },
  { label: "Properties", icon: Tag },
  { label: "Listing", icon: Layers },
];

interface Property {
  trait_type: string;
  value: string;
}

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState("");
  const [properties, setProperties] = useState<Property[]>([
    { trait_type: "", value: "" },
  ]);
  const [listingType, setListingType] = useState<"fixed" | "auction" | "none">("fixed");
  const [price, setPrice] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      setFile(dropped);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(dropped);
    }
  };

  const addProperty = () => {
    setProperties([...properties, { trait_type: "", value: "" }]);
  };

  const removeProperty = (index: number) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  const updateProperty = (
    index: number,
    field: "trait_type" | "value",
    val: string
  ) => {
    const updated = [...properties];
    updated[index][field] = val;
    setProperties(updated);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!file;
      case 1: return name.length > 0;
      case 2: return true;
      case 3: return listingType === "none" || price.length > 0;
      default: return false;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Progress Steps */}
        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              className={`${styles.step} ${i === currentStep ? styles.stepActive : ""} ${
                i < currentStep ? styles.stepComplete : ""
              }`}
            >
              <div className={styles.stepIcon}>
                {i < currentStep ? <Check size={16} /> : <step.icon size={16} />}
              </div>
              <span className={styles.stepLabel}>{step.label}</span>
              {i < STEPS.length - 1 && <div className={styles.stepLine} />}
            </div>
          ))}
        </div>

        <div className={styles.content}>
          {/* Left: Form */}
          <div className={styles.formArea}>
            {/* Step 0: Upload */}
            {currentStep === 0 && (
              <div className={styles.formSection}>
                <h2 className={styles.formTitle}>Upload Your Artwork</h2>
                <p className={styles.formDesc}>
                  Supported formats: JPG, PNG, GIF, SVG, MP4, WEBM. Max size: 100MB.
                </p>
                <div
                  className={styles.dropzone}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {preview ? (
                    <div className={styles.previewContainer}>
                      <Image src={preview} alt="Preview" fill className={styles.previewImage} />
                      <button
                        className={styles.removeFile}
                        onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className={styles.dropzoneContent}>
                      <ImagePlus size={48} className={styles.dropzoneIcon} />
                      <p className={styles.dropzoneTitle}>Drag & drop your file here</p>
                      <p className={styles.dropzoneSub}>or click to browse</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    id="create-file-input"
                  />
                </div>
              </div>
            )}

            {/* Step 1: Details */}
            {currentStep === 1 && (
              <div className={styles.formSection}>
                <h2 className={styles.formTitle}>NFT Details</h2>
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Name *</label>
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter NFT name" className={styles.fieldInput} id="create-name"
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Description</label>
                  <textarea
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your NFT..." className={styles.fieldTextarea}
                    rows={4} id="create-description"
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Collection</label>
                  <input
                    type="text" value={collection} onChange={(e) => setCollection(e.target.value)}
                    placeholder="Select or create a collection" className={styles.fieldInput}
                    id="create-collection"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Properties */}
            {currentStep === 2 && (
              <div className={styles.formSection}>
                <h2 className={styles.formTitle}>Properties & Traits</h2>
                <p className={styles.formDesc}>
                  Add traits to make your NFT unique and discoverable.
                </p>
                <div className={styles.propertiesList}>
                  {properties.map((prop, i) => (
                    <div key={i} className={styles.propertyRow}>
                      <input
                        type="text" value={prop.trait_type}
                        onChange={(e) => updateProperty(i, "trait_type", e.target.value)}
                        placeholder="Trait name" className={styles.fieldInput}
                      />
                      <input
                        type="text" value={prop.value}
                        onChange={(e) => updateProperty(i, "value", e.target.value)}
                        placeholder="Value" className={styles.fieldInput}
                      />
                      <button className={styles.removePropertyBtn} onClick={() => removeProperty(i)}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button className={styles.addPropertyBtn} onClick={addProperty}>
                  <Plus size={16} /> Add Property
                </button>
              </div>
            )}

            {/* Step 3: Listing */}
            {currentStep === 3 && (
              <div className={styles.formSection}>
                <h2 className={styles.formTitle}>Listing Options</h2>
                <div className={styles.listingOptions}>
                  {(["fixed", "auction", "none"] as const).map((type) => (
                    <button
                      key={type}
                      className={`${styles.listingOption} ${listingType === type ? styles.listingActive : ""}`}
                      onClick={() => setListingType(type)}
                    >
                      <span className={styles.listingLabel}>
                        {type === "fixed" ? "Fixed Price" : type === "auction" ? "Timed Auction" : "Not for Sale"}
                      </span>
                    </button>
                  ))}
                </div>
                {listingType !== "none" && (
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>
                      {listingType === "fixed" ? "Price" : "Starting Price"} *
                    </label>
                    <div className={styles.priceInputWrapper}>
                      <input
                        type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00" className={styles.fieldInput} id="create-price"
                      />
                      <span className={styles.priceSuffix}>ETH</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className={styles.navButtons}>
              {currentStep > 0 && (
                <button className={styles.prevBtn} onClick={() => setCurrentStep(currentStep - 1)}>
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              {currentStep < STEPS.length - 1 ? (
                <button
                  className={styles.nextBtn} disabled={!canProceed()}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button className={styles.mintBtn} disabled={!canProceed()}>
                  <Sparkles size={16} /> Mint NFT
                </button>
              )}
            </div>
          </div>

          {/* Right: Preview Card */}
          <div className={styles.previewArea}>
            <h3 className={styles.previewTitle}>
              <Eye size={18} /> Preview
            </h3>
            <div className={styles.previewCard}>
              <div className={styles.previewCardImage}>
                {preview ? (
                  <Image src={preview} alt="NFT Preview" fill className={styles.previewImg} />
                ) : (
                  <div className={styles.previewPlaceholder}>
                    <ImagePlus size={32} />
                    <span>Upload to preview</span>
                  </div>
                )}
              </div>
              <div className={styles.previewCardInfo}>
                <span className={styles.pcCollection}>{collection || "Collection"}</span>
                <h4 className={styles.pcName}>{name || "NFT Name"}</h4>
                <div className={styles.pcPrice}>
                  <span className={styles.pcPriceLabel}>Price</span>
                  <span className={styles.pcPriceValue}>
                    ◆ {price || "0.00"} ETH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
