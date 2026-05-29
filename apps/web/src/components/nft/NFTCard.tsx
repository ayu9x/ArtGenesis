"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Clock, BadgeCheck } from "lucide-react";
import styles from "./NFTCard.module.css";

interface NFTCardProps {
  id: string;
  image: string;
  title: string;
  collection: string;
  isVerified?: boolean;
  price: string;
  currency?: string;
  usdPrice?: string;
  creatorAvatar?: string;
  creatorName: string;
  likes?: number;
  isAuction?: boolean;
  endTime?: string;
}

export function NFTCard({
  id,
  image,
  title,
  collection,
  isVerified = false,
  price,
  currency = "ETH",
  usdPrice,
  creatorAvatar,
  creatorName,
  likes = 0,
  isAuction = false,
  endTime,
}: NFTCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <Link href={`/nft/${id}`} className={styles.card} id={`nft-card-${id}`}>
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={styles.image}
          />
        </div>

        {/* Overlay on Hover */}
        <div className={styles.overlay}>
          <button className={styles.buyOverlayButton}>
            <ShoppingCart size={16} />
            {isAuction ? "Place Bid" : "Buy Now"}
          </button>
        </div>

        {/* Like Button */}
        <button
          className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`}
          onClick={handleLike}
          aria-label="Like this NFT"
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          {likeCount > 0 && (
            <span className={styles.likeCount}>{likeCount}</span>
          )}
        </button>

        {/* Auction Badge */}
        {isAuction && endTime && (
          <div className={styles.auctionBadge}>
            <Clock size={12} />
            <span>{endTime}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.collectionRow}>
          <span className={styles.collectionName}>{collection}</span>
          {isVerified && <BadgeCheck size={14} className={styles.verifiedIcon} />}
        </div>

        <h3 className={styles.title}>{title}</h3>

        <div className={styles.priceRow}>
          <div className={styles.priceInfo}>
            <span className={styles.priceLabel}>
              {isAuction ? "Current Bid" : "Price"}
            </span>
            <div className={styles.priceValue}>
              <span className={styles.ethIcon}>◆</span>
              <span className={styles.price}>{price} {currency}</span>
            </div>
            {usdPrice && <span className={styles.usdPrice}>${usdPrice}</span>}
          </div>

          <div className={styles.creatorInfo}>
            <div className={styles.creatorAvatar}>
              {creatorAvatar ? (
                <Image
                  src={creatorAvatar}
                  alt={creatorName}
                  width={24}
                  height={24}
                  className={styles.creatorAvatarImg}
                />
              ) : (
                <span className={styles.creatorInitial}>
                  {creatorName.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
