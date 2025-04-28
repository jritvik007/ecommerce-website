import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useCart} from '../Context/Cartcontext';

function Layout({ children }) {
    const { cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navItems = [
    { text: "Dashboard", path: "/" },
    { text: "All Products", path: "/products" },
    { text: "Categories", path: "/categories" },
    { text: "Cart", path: "/cart" }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My E-Commerce
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List sx={{ width: 250 }}>
          {navItems.map((item, index) => (
            <ListItem button key={index} onClick={() => { navigate(item.path); setOpen(false); }}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;