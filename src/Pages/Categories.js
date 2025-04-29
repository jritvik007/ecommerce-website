import Layout from '../Components/Layout';
import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import electronicsImg from '../Assets/images/electronics.jpeg';
import jeweleryImg from '../Assets/images/jewellery.jpg';
import mensclothingImg from '../Assets/images/mens.jpg';
import womensclothingImg from '../Assets/images/womens.jpg';

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const categoryImages = {
    electronics: electronicsImg,
    jewelery: jeweleryImg,
    'men\'s clothing': mensclothingImg,
    'women\'s clothing': womensclothingImg,
  };

  const getImageUrl = (category) => categoryImages[category.toLowerCase()];

  return (
    <Layout>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', marginTop: 2 }}>
        Categories
      </Typography>
      <Grid container spacing={3} justifyContent={'center'} sx={{ marginTop: 3 }}>
        {categories.map((category) => (
          <Grid item xs={12} key={category}>
            <Card
            sx={{
              width: 300, 
              height: 270, 
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 3, 
              transition: 'transform 0.3s ease', 
              '&:hover': {
                transform: 'scale(1.05)', 
                boxShadow: 6, 
              },
            }}>
              <CardActionArea onClick={() => navigate(`/category/${category}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={getImageUrl(category)} 
                  alt={category}
                />
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
