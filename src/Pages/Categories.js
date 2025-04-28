import Layout from '../Components/Layout';
import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <Layout>
      <h1>Categories</h1>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category}>
            <Card>
              <CardActionArea onClick={() => navigate(`/category/${category}`)}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" align="center" sx={{ textTransform: 'capitalize' }}>
                    {category}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default Categories;