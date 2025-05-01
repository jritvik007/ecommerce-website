import { Typography, Box, Grid, Card, CardContent, CardMedia, Button, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Layout from '../Components/Layout';
import { useNavigate } from 'react-router-dom';

import gif1 from '../Assets/images/slide1.gif';
import gif2 from '../Assets/images/slide2.gif';
import gif3 from '../Assets/images/slide3.gif';
import gif4 from '../Assets/images/slide4.gif';

import mobileimage1 from '../Assets/images/mobile1.jpg';
import mobileimage2 from '../Assets/images/mobile2.jpg';
import mobileimage3 from '../Assets/images/mobile3.jpg';
import mobileimage4 from '../Assets/images/mobile4.png';
import tabletimage1 from '../Assets/images/tablet1.jpg';
import tabletimage2 from '../Assets/images/tablet2.jpg';
import tabletimage3 from '../Assets/images/tablet3.jpg';
import tabletimage4 from '../Assets/images/tablet4.jpg';

import electronics2 from '../Assets/images/electronics2.png';
import mens2 from '../Assets/images/mens2.png';
import womens2 from '../Assets/images/womens2.png';
import jewellery2 from '../Assets/images/jewellery2.png';
import shoes from '../Assets/images/shoes.png';
import book from '../Assets/images/book.png';

const desktopImages = [
  { url: gif1, alt: 'First GIF' },
  { url: gif2, alt: 'Second GIF' },
  { url: gif3, alt: 'Third GIF' },
  { url: gif4, alt: 'Fourth GIF' },
];

const tabletImages = [
  { url: tabletimage1, alt: 'Tablet image 1' },
  { url: tabletimage2, alt: 'Tablet image 2' },
  { url: tabletimage3, alt: 'Tablet image 3' },
  { url: tabletimage4, alt: 'Tablet image 4' },
];

const mobileImages = [
  { url: mobileimage1, alt: 'Mobile image 1' },
  { url: mobileimage2, alt: 'Mobile image 2' },
  { url: mobileimage3, alt: 'Mobile image 3' },
  { url: mobileimage4, alt: 'Mobile image 4' },
];

const cardData = [
  { title: 'Electronics | Up to 60% off', image: electronics2, category: 'electronics' },
  { title: "Men's Fashion | 50-80% off", image: mens2, category: "men's clothing" },
  { title: "Women's Fashion | 50% off", image: womens2, category: "women's clothing" },
  { title: 'Jewellery | 25% off', image: jewellery2, category: 'jewelery' },
  { title: 'Shoes | Flat 60% off', image: shoes, category: 'shoes' },
  { title: 'Books | Buy 1 Get 1 Free', image: book, category: 'books' },
];

function Dashboard() {
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');
  
  let carouselImages = desktopImages;
  if (isMobile) {
    carouselImages = mobileImages;
  } else if (isTablet) {
    carouselImages = tabletImages;
  }

  const handleExploreClick = (category) => {
    navigate(`/category/${category}`);
  };

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
          {carouselImages.map((img, index) => (
            <div key={index}>
              <img
                src={img.url}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
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
                width: 310,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 350,
                boxShadow: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                image={card.image}
                alt={card.title}
                sx={{
                  height: 400,
                  width: '100%',
                  objectFit: 'contain',
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography sx={{ ml: 1 }} variant="h6" gutterBottom>
                  {card.title}
                </Typography>
                <Button sx={{ fontSize: 14 }} onClick={() => handleExploreClick(card.category)}>
                  Explore items
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default Dashboard;
