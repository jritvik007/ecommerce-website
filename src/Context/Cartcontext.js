import { createContext, useContext, useState } from 'react';
import { Snackbar } from '@mui/material';

const Cartcontext = createContext();

export function useCart() {
  return useContext(Cartcontext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  const login = (userInfo) => {
    setIsLoggedIn(true);
    setUser(userInfo);
    showSnackbar(`Welcome, ${userInfo.name}!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    showSnackbar('Logged out successfully!');
  };

  const addToCart = (product) => {
    if (!isLoggedIn) {
      showSnackbar('Please login first!');
      return;
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    showSnackbar('Added to Cart!');
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          return prevItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          return prevItems.filter(item => item.id !== id);
        }
      }
      return prevItems;
    });
    showSnackbar('Removed from Cart!');
  };

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Cartcontext.Provider value={{ cartItems, addToCart, removeFromCart, login, logout, isLoggedIn, user, cartQuantity }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={500}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Cartcontext.Provider>
  );
}