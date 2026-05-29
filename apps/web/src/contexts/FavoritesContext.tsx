"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type NFTItem = {
  id: string;
  title: string;
  collection: string;
  creator: string;
  price: string;
  likes: number;
  image: string;
};

interface FavoritesContextType {
  favorites: NFTItem[];
  addFavorite: (item: NFTItem) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: NFTItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<NFTItem[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("artgenesis_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Save to local storage when changed
  useEffect(() => {
    localStorage.setItem("artgenesis_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item: NFTItem) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  const toggleFavorite = (item: NFTItem) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
