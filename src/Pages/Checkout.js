import Layout from '../Components/Layout';
import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <Layout>
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Confirm Your Order
        </Typography>
        <Button variant="contained" color="success" onClick={handleConfirmOrder}>
          Place Order
        </Button>
      </Container>
    </Layout>
  );
}

export default Checkout;