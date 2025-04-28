import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Appbar from '../Components/SimpleAppBar';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    alert('Registered Successfully!');
    navigate('/login');
  };

  return (
    <>
      <Appbar />
      <Container maxWidth="xs">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Register
            </Button>
            <Button fullWidth onClick={() => navigate('/login')} sx={{ mt: 1 }}>
              Already have an account? Login
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Register;