import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ProductItem, ProtocolItem } from '../types';

// --- Types ---
export interface CartItem extends ProductItem {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: ProductItem | ProtocolItem, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
}

// --- Context ---
const CartContext = createContext<CartState | undefined>(undefined);

// --- Provider ---
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: ProductItem | ProtocolItem, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      // Add new item
      return [...prevItems, { ...(item as ProductItem), quantity }]; // We assert as ProductItem for simplicity, assuming common fields.
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(i =>
          i.id === itemId ? { ...i, quantity: newQuantity } : i
        )
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// --- Custom Hook ---
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
