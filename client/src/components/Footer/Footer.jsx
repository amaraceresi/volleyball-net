import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#42A5F5', p: { xs: 3, sm: 6 }, pb: 1, color: 'white' }}> {/* Reduce padding-bottom here */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
            <Facebook fontSize="small" /> <Twitter fontSize="small" /> <LinkedIn fontSize="small" /> <Instagram fontSize="small" />
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: 'right' }}>
            <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
              Contact
            </Link>
            <br />
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
              About
            </Link>
            <br />
            <Link to="/location" style={{ color: 'inherit', textDecoration: 'none' }}>
              Location
            </Link>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" gutterBottom>
            © 2023 HIGHPOINT GROVE BEACH VOLLEYBALL
          </Typography>
        </Box>
        <Typography variant="caption" align="left" mt={1}>
          <Link to="/terms-of-service" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.7rem' }}>
            Terms of Service
          </Link>
          {' | '}
          <Link to="/privacy-policy" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.7rem' }}>
            Privacy Policy
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
