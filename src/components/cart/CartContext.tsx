"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import {
  getCheckout,
  addToCart as shopifyAddToCart,
  removeFromCart as shopifyRemoveFromCart,
  updateCartItem as shopifyUpdateCartItem,
  getCheckoutUrl,
} from "@/lib/shopify";

interface LineItem {
  id: string;
  title: string;
  quantity: number;
  variant: {
    id: string;
    title: string;
    price: { amount: string };
    image?: { src: string };
  };
}

interface CartContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  items: LineItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  checkout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<LineItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  // Load cart on mount
  useEffect(() => {
    async function loadCart() {
      try {
        const checkout = await getCheckout();
        if (checkout && checkout.lineItems) {
          setItems(checkout.lineItems as unknown as LineItem[]);
        }
      } catch {
        // Silently fail on initial load - cart will be empty
        // This is expected when Shopify token is not configured
      }
    }
    loadCart();
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce((total, item) => {
    const price = parseFloat(item.variant?.price?.amount || "0");
    return total + price * item.quantity;
  }, 0);

  const addToCart = async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedCheckout = await shopifyAddToCart(variantId, quantity);
      if (updatedCheckout && updatedCheckout.lineItems) {
        setItems(updatedCheckout.lineItems as unknown as LineItem[]);
        setIsOpen(true);
      }
    } catch {
      setError("Failed to add item to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineItemId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedCheckout = await shopifyRemoveFromCart(lineItemId);
      if (updatedCheckout && updatedCheckout.lineItems) {
        setItems(updatedCheckout.lineItems as unknown as LineItem[]);
      }
    } catch {
      setError("Failed to remove item from cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    setIsLoading(true);
    setError(null);
    try {
      if (quantity <= 0) {
        await removeFromCart(lineItemId);
        return;
      }
      const updatedCheckout = await shopifyUpdateCartItem(lineItemId, quantity);
      if (updatedCheckout && updatedCheckout.lineItems) {
        setItems(updatedCheckout.lineItems as unknown as LineItem[]);
      }
    } catch {
      setError("Failed to update cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const checkout = async () => {
    setError(null);
    try {
      const url = await getCheckoutUrl();
      if (url) {
        window.location.href = url;
      } else {
        setError("Unable to proceed to checkout. Please try again.");
      }
    } catch {
      setError("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        items,
        itemCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkout,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
