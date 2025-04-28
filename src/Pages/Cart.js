import Layout from '../Components/Layout';
import { useCart } from '../Context/Cartcontext';
import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions, Divider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6">Your Cart is Empty 🛒</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                    sx={{ objectFit: 'contain', p: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" noWrap>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button color="error" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">
              Total: ${totalPrice.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/checkout')}>
               Proceed to Checkout
             </Button>
          </Box>
        </>
      )}
    </Layout>
  );
}

export default Cart;