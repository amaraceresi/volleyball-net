import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Page from "../../components/Page";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import insta from '../../images/insta.jpg';
import insta2 from '../../images/insta2.jpg';
import court2 from '../../images/court2.jpeg';

const ImageSlideshow = () => {
  const images = [insta, insta2, court2];
  return (
    <Carousel>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt="" style={{ width: '100%', height: 'auto' }} />
        </div>
      ))}
    </Carousel>
  );
};

const data = [
  {
    src: 'https://www.youtube.com/embed/HvR4X4IY0F0',
    title: 'Beach Volleyball Tips | 5 Secrets to Level Up Your Game',
    channel: 'Better at Beach Volleyball',
    views: '294,532 views',
    createdAt: '3 years ago',
  },
];

function Media() {
  return (
    <Grid container wrap="nowrap">
      {data.map((item, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          <iframe width="210" height="118" src={item.src} title={item.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          <Box sx={{ pr: 2 }}>
            <Typography gutterBottom variant="body2">{item.title}</Typography>
            <Typography display="block" variant="caption" color="text.secondary">{item.channel}</Typography>
            <Typography variant="caption" color="text.secondary">{`${item.views} • ${item.createdAt}`}</Typography>
          </Box>
        </Box>
      ))}
    </Grid>
  );
}

function YouTube() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Media />
    </Box>
  );
}

function BulletinBoard() {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6">Upcoming News:</Typography>
      <List>
        <ListItem>Due to unexpected weather conditions, today's beach volleyball practice has been cancelled. Stay safe and see you at the next scheduled practice!</ListItem>
        <Divider />
        <ListItem>Register for Summer Slam closing 8/8</ListItem>
      </List>
    </Paper>
  );
}

function MiniCalendar() {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6">Upcoming Events:</Typography>
      <List>
        <ListItem>Summer Slam 8/10</ListItem>
        <Divider />
        <ListItem>Monday Night Mashup 8/14</ListItem>
        <Divider />
        <ListItem>Freedom Fest 8/25</ListItem>
      </List>
    </Paper>
  );
}

const headContent = (
  <>
    <title>Home</title>
    <meta name="description" content="This is Volleyball Net's homepage." />
  </>
);

const HomePage = () => {
  return (
    <Page isProtected={false} headContent={headContent}>
      <Box sx={{ marginX: '5%', paddingY: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary">
              Register Here
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ImageSlideshow />
              </Grid>
              <Grid item xs={12}>
                <YouTube />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <BulletinBoard />
            <MiniCalendar />
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default HomePage;