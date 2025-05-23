import Layout from '../Components/Layout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Grid, Card, CardMedia, CardContent, Typography, Button, CardActions, 
  Fab, Dialog, DialogTitle, DialogContent, DialogActions, Rating 
} from '@mui/material';
import { useCart } from '../Context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CategoryProducts() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [category]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <Layout>
      <Fab 
        variant="extended" 
        color="primary" 
        onClick={() => navigate(-1)}
        sx={{ mr: 'auto', mb: 2,
          bgcolor: '#ff9800',
          '&:hover': {
            bgcolor: '#ff5722',
          }
        }}
      >
        <ArrowBackIcon/>
        Go Back
      </Fab>

      <Typography 
        color="primary" 
        variant="h4" 
        gutterBottom 
        align="center" 
        sx={{ fontWeight: 'bold', textTransform: 'capitalize', mb: 4 }}
      >
        {category}
      </Typography>

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
                  cursor: 'pointer'
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
                onClick={() => handleProductClick(product)}
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

      <Dialog open={Boolean(selectedProduct)} onClose={handleCloseModal}>
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body1">{selectedProduct.description}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Price: ${selectedProduct.price}
              </Typography>
              <Rating name="read-only" value={selectedProduct.rating?.rate} precision={0.5} readOnly sx={{mt: 2}}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Layout>
  );
}

export default CategoryProducts;
