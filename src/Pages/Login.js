import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Appbar from '../Components/SimpleAppBar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }
    alert('Logged In Successfully!');
    navigate('/dashboard');
  };

  return (
    <>
      <Appbar />
      <Container maxWidth="xs">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
              Login
            </Button>
            <Button fullWidth onClick={() => navigate('/register')} sx={{ mt: 1 }}>
              Don't have an account? Register
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Login;