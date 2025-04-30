import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText,
  Box, Badge, Button, Divider, Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, ListItemIcon, Grid
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cartcontext';
import logo from '../Assets/images/shopping-bag.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { cartQuantity, isLoggedIn, logout, user, wishlistItems } = useCart();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false);
    logout();
    navigate("/products");
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const navItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Products", path: "/products", icon: <StorefrontIcon /> },
    { text: "Categories", path: "/categories", icon: <CategoryIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: 40, ml: 1, mr: 1 }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E-Shop
          </Typography>
          <IconButton onClick={() => navigate('/wishlist')} color="inherit">
            <Badge badgeContent={wishlistItems.length} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cartQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 2, ml: 2 }}>
                Welcome, {user.name}
              </Typography>
              <Button color="inherit" onClick={handleLogoutClick} endIcon={<LogoutIcon />}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{ marginLeft: 2 }}
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List sx={{ width: 250, cursor: 'pointer' }}>
          <IconButton onClick={toggleDrawer} sx={{ ml: 25 }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Divider sx={{ mt: 1 }} />
          {navItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
            >
              {item.icon && (
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              )}
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleCancelLogout}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="error" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 4, mt: 4 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                E-Shop
              </Typography>
              <Typography variant="body2">
                Your one-stop shop for all things fashion, electronics, and more.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ml:8}}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                Dashboard
              </Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>
                Products
              </Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/categories')}>
                Categories
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ml:9}}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">Email: support@eshop.com</Typography>
              <Typography variant="body2">Phone: +91 9876543210</Typography>
            </Grid>

        <Grid item xs={12} sm={4} sx={{ml:9}}>
         <Typography variant="h6" gutterBottom>
         Follow Us
         </Typography>
         <Box sx={{ display: 'flex', gap: 2 }}>
         <IconButton
         component="a"
         href="https://facebook.com"
         target="_blank"
         rel="noopener noreferrer"
         sx={{ color: 'white' }}
          >
          <FacebookIcon />
          </IconButton>
          <IconButton
          component="a"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}
          >
          <TwitterIcon />
          </IconButton>
          <IconButton
          component="a"
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}
           >
          <InstagramIcon />
          </IconButton>
          <IconButton
           component="a"
           href="https://linkedin.com"
           target="_blank"
           rel="noopener noreferrer"
           sx={{ color: 'white' }}
            >
           <LinkedInIcon />
           </IconButton>
           </Box>
          </Grid>
          </Grid>
          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.3)' }} />
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
