import Layout from '../Components/Layout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useCart } from '../Context/Cartcontext';
import { useNavigate } from 'react-router-dom';

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
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => addToCart(product)}>Add to Cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="outlined" onClick={() => navigate(-1)}>Go Back</Button>
    </Layout>
  );
}

export default CategoryProducts;