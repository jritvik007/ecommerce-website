import Layout from '../Components/Layout';
import { useCart } from '../Context/Cartcontext';
import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions, Divider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" gutterBottom align='center' sx={{ mt: 4}}>Cart is Empty 🛒</Typography>
      ) : (
        <>
          <Grid container spacing={3} justifyContent='center'>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
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
                    image={item.image}
                    alt={item.title}
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
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ paddingTop: 0 }}>
                    <Button color="error" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                    <Typography variant="body2" sx={{ paddingTop: 0 }} style={{marginLeft: 'auto', marginRight: 5}}>
                      Quantity: {item.quantity}
                    </Typography>
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
            <Button variant="contained" color="primary" onClick={() => navigate('/orderplaced')}>
              Place Order
            </Button>
          </Box>
        </>
      )}
    </Layout>
  );
}

export default Cart;