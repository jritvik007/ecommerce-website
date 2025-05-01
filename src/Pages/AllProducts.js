import Layout from '../Components/Layout';
import { useEffect, useState } from 'react';
import {
  Grid, Card, CardMedia, CardContent, Typography, Button, CardActions,
  TextField, Box, useMediaQuery, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { useCart } from '../Context/Cartcontext';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(['All', ...data]));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || product.category === selectedCategory)
  );

  return (
    <Layout>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography color="primary" variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Products
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <FormControl sx={{ width: isSmallScreen ? '30%' : '10%'}}>
            <InputLabel id="category-select-label">Filter by Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Filter by Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: isSmallScreen ? '60%' : '40%' }}
          />
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {filteredProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                width: 300,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{
                  objectFit: 'contain',
                  maxHeight: '200px',
                  width: 250,
                  p: 2,
                  display: 'block',
                  margin: '0 auto',
                }}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', paddingBottom: '16px' }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Stack spacing={1} alignItems="center">
                  <Rating name="half-rating-read" value={product.rating.rate} precision={0.5} readOnly />
                </Stack>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', paddingTop: 0, ml: 6 }}>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
                <Checkbox
                  color="error"
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={isInWishlist(product.id)}
                  onChange={() =>
                    isInWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product)
                  }
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default AllProducts;
