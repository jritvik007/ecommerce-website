import Layout from '../Components/Layout';
import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 100, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Order Placed Successfully! 🎉
        </Typography>
        <Button color="primary" onClick={()=> navigate('/products')} sx={{ mt: 2 }}>
            Continue Shopping
        </Button>
      </Container>
    </Layout>
  );
}

export default OrderPlaced;