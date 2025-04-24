import React, { useEffect, useState } from 'react';
import { AppBar, Box, CssBaseline, Drawer, Toolbar, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, Grid,
  Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { Dashboard, Category, Menu as MenuIcon, ShoppingCart, People } from '@mui/icons-material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import mensClothing from '../Assets/images/mens.jpg';
import womensClothing from '../Assets/images/womens.jpg';
import jewellery from '../Assets/images/jewellery.jpg';
import electronics from '../Assets/images/electronics.jpeg';

const drawerWidth = 240;

const categoryImages = {
  "electronics": electronics,
  "jewelery": jewellery,
  "men's clothing": mensClothing,
  "women's clothing": womensClothing,
};

function CategoriesPage() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories:', err))
      .finally(() => setLoading(false));
  }, []);

  const drawer = (
    <>
      <Toolbar />
      <List>
        <ListItem onClick={() => navigate('/')}>
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem onClick={() => navigate('/products')}>
          <ListItemIcon><ShoppingBasketIcon /></ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem onClick={() => navigate('/categories')}>
          <ListItemIcon><Category /></ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem onClick={() => navigate('/users')}>
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem onClick={() => navigate('/orders')}>
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Product Categories
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: 400, width: 500, display: 'flex', flexDirection: 'column', boxShadow: 3 , cursor: 'pointer'}}>
                  <CardMedia
                    component="img"
                    image={categoryImages[category] }
                    alt={category}
                    sx={{
                      height: 300,
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', textTransform: 'capitalize' }}>
                    <Typography variant="h6">{category}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default CategoriesPage;
