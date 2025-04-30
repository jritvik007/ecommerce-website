import { Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Layout from '../Components/Layout';

import gif1 from '../Assets/images/slide1.gif';
import gif2 from '../Assets/images/slide2.gif';
import gif3 from '../Assets/images/slide3.gif';
import gif4 from '../Assets/images/slide4.gif';
import electronics2 from '../Assets/images/electronics2.png';
import mens2 from '../Assets/images/mens2.png';
import womens2 from '../Assets/images/womens2.png';
import jewellery2 from '../Assets/images/jewellery2.png';
import shoes from '../Assets/images/shoes.png';
import book from '../Assets/images/book.png';


const images = [
  { url: gif1, alt: 'First GIF' },
  { url: gif2, alt: 'Second GIF' },
  { url: gif3, alt: 'Third GIF' },
  { url: gif4, alt: 'Fourth GIF' }
];

const cardData = [
  { title: 'Electronics', image: electronics2 },
  { title: 'Men\'s Fashion', image: mens2 },
  { title: 'Women\'s Fashion', image: womens2 },
  { title: 'Jewelery', image: jewellery2},
  { title: 'Shoes', image: shoes },
  { title: 'Books', image: book },
];

function Dashboard() {
  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          dynamicHeight={false}
        >
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img.url}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover'
                }}
              />
            </div>
          ))}
        </Carousel>
      </Box>

      <Typography variant="h5" align="center" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>
        Featured Products
      </Typography>

      <Grid container spacing={3} justifyContent="center">
  {cardData.map((card, index) => (
    <Grid item key={index} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          width: 350,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 350,
          boxShadow: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
        }}}
      >
        <CardMedia
          component="img"
          image={card.image}
          alt={card.title}
          sx={{
            height: 400,
            width: '100%',
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography sx={{ml:1}} variant="h6" gutterBottom>
            {card.title}
          </Typography>
          <Button sx={{fontSize: 14}}>Explore more</Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

    </Layout>
  );
}

export default Dashboard;
