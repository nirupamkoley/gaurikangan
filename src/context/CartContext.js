import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTotalCartItem } from '../helpers/Helper';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      try {
        const cartItems = getTotalCartItem();
        setTotalCartItems(cartItems);

        // Periodically check for updates in cart items
        const interval = setInterval(() => {
          const updatedCartItems = getTotalCartItem();
          if (updatedCartItems !== totalCartItems) {
            setTotalCartItems(updatedCartItems);
            setCartUpdated(true);

            // Reset update animation after 2 seconds
            setTimeout(() => {
              setCartUpdated(false);
            }, 2000);
          }
        }, 5000); // Check every 5 seconds

        // Listen for storage events to detect cart updates
        const handleStorageChange = () => {
          const updatedCartItems = getTotalCartItem();
          setTotalCartItems(updatedCartItems);
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
          clearInterval(interval); // Cleanup interval on unmount
          window.removeEventListener('storage', handleStorageChange); // Cleanup event listener
        };
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setTotalCartItems(0);
      }
    }
  }, [totalCartItems]);

  const updateCartCount = () => {
    if (typeof window !== 'undefined') {
      try {
        const cartItems = getTotalCartItem();
        setTotalCartItems(cartItems);
        setCartUpdated(true);
        
        // Reset update animation after 2 seconds
        setTimeout(() => {
          setCartUpdated(false);
        }, 2000);
      } catch (error) {
        console.error("Error updating cart count:", error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ totalCartItems, cartUpdated, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext) || { totalCartItems: 0, cartUpdated: false, updateCartCount: () => {} };