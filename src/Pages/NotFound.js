import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h2" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Oops! Page Not Found.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Container>
    </Layout>
  );
}

export default NotFound;