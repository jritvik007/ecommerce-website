import Layout from '../Components/Layout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useCart } from '../Context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CategoryProducts() {
    const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [category]);

  return (
    <Layout>
      <h1 style={{ textTransform: 'capitalize' }}>{category}</h1>
      <Grid container spacing={3} justifyContent="center">
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
                <CardActions sx={{ justifyContent: 'center', paddingTop: 0 }}>
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}
      sx={{ mt: 2 , ml: 2 }}>Go Back</Button>
    </Layout>
  );
}

export default CategoryProducts;