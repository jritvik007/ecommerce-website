import { createContext, useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

    if (storedUser && storedIsLoggedIn) {
      setUser(storedUser);
      setIsLoggedIn(storedIsLoggedIn);

      const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
      const userCart = allCarts[storedUser.email] || [];
      setCartItems(userCart);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && user?.email) {
      const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
      allCarts[user.email] = cartItems;
      localStorage.setItem('userCarts', JSON.stringify(allCarts));
    }
  }, [cartItems, isLoggedIn, user]);

  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  const login = (userInfo) => {
    setIsLoggedIn(true);
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('isLoggedIn', true);

    const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    const userCart = allCarts[userInfo.email] || [];
    setCartItems(userCart);

    showSnackbar(`Welcome, ${userInfo.name}!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCartItems([]);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
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
    <Cartcontext.Provider value={{
      cartItems, addToCart, removeFromCart, login, logout,
      isLoggedIn, user, cartQuantity
    }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Cartcontext.Provider>
  );
}
