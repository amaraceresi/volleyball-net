import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Page from "../../components/Page";

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
          <iframe
            width="210"
            height="118"
            src={item.src}
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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

const headContent = (
  <>
    <title>Home</title>
    <meta name="description" content="This is Volleyball Net's homepage." />
  </>
);

const HomePage = () => {
  return (
    <Page isProtected={false} headContent={headContent}>
      <div>
        <YouTube />
      </div>
    </Page>
  );
};

export default HomePage;
