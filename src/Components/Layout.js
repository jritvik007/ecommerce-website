import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText,
  Box, Badge, Button, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cartcontext';
import logo from '../Assets/images/shopping-bag.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';


function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const { cartQuantity, isLoggedIn, logout, user } = useCart();
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
    navigate("/products")
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const navItems = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon />},
    { text: "Products", path: "/products", icon: <StorefrontIcon /> },
    { text: "Categories", path: "/categories", icon: <CategoryIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: 40,
              ml: 1,
              mr: 1,
            }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E-Shop
          </Typography>

          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cartQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr:2 , ml: 2 }}>
                Welcome, {user.name}
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogoutClick}
                endIcon={<LogoutIcon />}
              >
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
          <Divider sx={{ mt: 7 }} />
          {navItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
            >
              {item.icon && <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>}
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
    </Box>
  );
}

export default Layout;
