import Layout from '../Components/Layout';
import { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useCart } from '../Context/Cartcontext';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Products
      </Typography>
      <Grid container spacing={3} justifyContent="center" xs={12}>
        {products.map(product => (
          <Grid item key={product.id}>
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
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', paddingTop: 0 , ml: 6}}>
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Checkbox color="error" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                </CardActions>
              </Card>
          </Grid>
        ))}
      </Grid> 
    </Layout>
  );
}

export default AllProducts;
