import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/images/shopping-bag.png';

function SimpleAppBar() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate('/products')}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: 40,
              ml: 1,
              mr: 1,
            }}
          />

          <Typography variant="h6" component="div">
            E-Shop
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ height: '64px' }} />
    </>
  );
}

export default SimpleAppBar;
