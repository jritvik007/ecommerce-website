import { createContext, useContext, useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cartcontext = createContext();

export function useCart() {
  return useContext(Cartcontext);
}

export function CartProvider({ children }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [wishlistItems, setWishlistItems] = useState(() => {
  const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (storedIsLoggedIn) {
      const storedWishlist = localStorage.getItem('wishlist');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } else {
      return [];
    }
  });

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

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    } else {
      localStorage.removeItem('wishlist');
    }
  }, [wishlistItems, isLoggedIn]);

  const addToWishlist = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems((prev) => [...prev, product]);
      showSnackbar('Added to Wishlist!');
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    showSnackbar('Removed from Wishlist!');
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

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
    setWishlistItems([]);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('wishlist'); 
    showSnackbar('Logged out successfully!');
  };

  const addToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
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
      isLoggedIn, user, cartQuantity, wishlistItems, addToWishlist, removeFromWishlist, isInWishlist
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
