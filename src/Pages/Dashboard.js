import { Grid, Typography, Card, CardContent, CardMedia, Box, Paper, Avatar } from '@mui/material';
import Layout from '../Components/Layout';
import salesImage from '../Assets/images/sales.jpg';
import usersImage from '../Assets/images/users.jpg';
import ordersImage from '../Assets/images/orders.png';
import revenueImage from '../Assets/images/revenue.jpg';
import graphImage from '../Assets/images/graph.png';

function Dashboard() {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
        Dashboard
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Total Sales
              </Typography>
              <Typography variant="h5" sx={{ color: 'green', fontWeight: 'bold' }}>
                ₹38,27,715
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="250"
              image={salesImage} 
              alt="Sales Overview"
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 , width: 450}}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Total Users
              </Typography>
              <Typography variant="h5" sx={{ color: 'blue', fontWeight: 'bold' }}>
                12,340
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="250"
              image={usersImage} 
              alt="Users Overview"
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 ,height: 362}}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                New Orders
              </Typography>
              <Typography variant="h5" sx={{ color: 'orange', fontWeight: 'bold' }}>
                34 Orders
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="235"
              image={ordersImage}
              alt="Orders Overview"
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Revenue
              </Typography>
              <Typography variant="h5" sx={{ color: 'purple', fontWeight: 'bold' }}>
               ₹6,97,494
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="250"
              image={revenueImage}
              alt="Revenue Overview"
            />
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ marginTop: 4, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={8}>
          <Card sx={{ padding: 3, boxShadow: 3 }}>
            <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Sales Analytics
            </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="240"
              image={graphImage}
              alt="Sales Analytics"
              sx={{ objectFit: 'contain', maxHeight: '400px', width: '100%', padding: 2 }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, boxShadow: 3, height: 351 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Latest Activity
            </Typography>
            <Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'blue', marginRight: 2 }}>A</Avatar>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  New Order Placed
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'green', marginRight: 2 }}>B</Avatar>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  New User Signed Up
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'purple', marginRight: 2 }}>C</Avatar>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Product Restocked
                </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'red', marginRight: 2 }}>D</Avatar>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Good Reviews
                </Typography>
                </Box>    
                <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'orange', marginRight: 2 }}>E</Avatar>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  New Product Added
                </Typography>
                </Box> 
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Dashboard;
