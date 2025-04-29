import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Badge, Button, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { useCart } from '../Context/Cartcontext';
import LogoutIcon from '@mui/icons-material/Logout';

function Layout({ children }) {
  const { cartQuantity } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useCart();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navItems = [
    { text: "Dashboard", path: "/" },
    { text: "Products", path: "/products" },
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
            E-Commerce
          </Typography>

          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cartQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ marginRight: 2, ml: 2 }}>Welcome, {user.name}</Typography>
              <Button color="inherit" onClick={logout} endIcon={<LogoutIcon />}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')} sx={{ marginLeft: 2 }} startIcon={<LoginIcon />}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List sx={{ width: 250, cursor: 'pointer' }}>
          <Divider sx={{ mt: 7 }}/>
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