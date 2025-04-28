import { AppBar, Toolbar, Typography } from '@mui/material';

function SimpleAppBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div">
          My E-Commerce
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default SimpleAppBar;