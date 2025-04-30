import { Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import Layout from '../Components/Layout';
import { useCart } from '../Context/Cartcontext';

function Wishlist() {
  const { wishlistItems, addToCart, removeFromWishlist } = useCart();

  return (
    <Layout>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Wishlist
      </Typography>
      {wishlistItems.length === 0 ? (
        <Typography variant="h6" gutterBottom align='center' sx={{ mt: 4}}>Wishlist is empty.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" xs={12}>
          {wishlistItems.map(product => (
            <Grid item key={product.id}>
              <Card sx={{
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
                }}>
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
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                  <Button color="error" onClick={() => removeFromWishlist(product.id)}>Remove</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}

export default Wishlist;