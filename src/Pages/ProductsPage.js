import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, CircularProgress, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { ShoppingCart, Dashboard, Menu as MenuIcon, Category, People } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const drawerWidth = 240;

function ProductsPage() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] =useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fetchData = () => {
    setLoading(true);

    Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/users'),
        axios.get('https://fakestoreapi.com/products'),
        axios.get('https://jsonplaceholder.typicode.com/posts')
    ])
    .then(([usersResponse, productsResponse, ordersResponse]) => {
        setUsers(usersResponse.data);
        setProducts(productsResponse.data);
        setOrders(ordersResponse.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
    .finally(() => {
        setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
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
                    <ListItemIcon><ShoppingBasketIcon/></ListItemIcon>
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
                <ListItem onClick={() => navigate('/cart')}>
                    <ListItemIcon><ShoppingCart /></ListItemIcon>
                    <ListItemText primary="Cart" />
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
          <Typography variant="h6" noWrap component="div">
            Products
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
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
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
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
          mt: 8
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
        ) : (
          <>
            <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: 500,
                  width: 300,
                  ml: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    height: 300,
                    objectFit: 'contain',
                    p: 2,
                    backgroundColor: '#f9f9f9'
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom noWrap>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    ${product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Button onClick={() => navigate('/cart')} variant='contained' sx={{ml: 7, mt: 1}} startIcon={<AddShoppingCartIcon/>}>Add to Cart</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductsPage;
