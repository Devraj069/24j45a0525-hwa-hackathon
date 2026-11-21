"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, size: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  isReady: boolean;
};

const STORAGE_KEY = "hwa-cart-v1";

const CartContext = createContext<CartContextValue | null>(null);

function sameLine(a: CartItem, slug: string, size: string) {
  return a.slug === slug && a.size === size;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed as CartItem[]);
      }
    } catch {
      setItems([]);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      return;
    }
  }, [items, isReady]);

  const addItem = useCallback((item: CartItem) => {
    setItems((current) => {
      const existing = current.find((line) =>
        sameLine(line, item.slug, item.size)
      );
      if (existing) {
        return current.map((line) =>
          sameLine(line, item.slug, item.size)
            ? { ...line, quantity: Math.min(20, line.quantity + item.quantity) }
            : line
        );
      }
      return [...current, { ...item, quantity: Math.min(20, item.quantity) }];
    });
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    setItems((current) =>
      current.filter((line) => !sameLine(line, slug, size))
    );
  }, []);

  const updateQuantity = useCallback(
    (slug: string, size: string, quantity: number) => {
      setItems((current) =>
        current.map((line) =>
          sameLine(line, slug, size)
            ? { ...line, quantity: Math.max(1, Math.min(20, quantity)) }
            : line
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      count,
      subtotal,
      isReady,
    };
  }, [items, addItem, removeItem, updateQuantity, clearCart, isReady]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
