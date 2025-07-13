// Copy this to: client/src/components/layout/Footer.jsx
import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2">
            © 2025 CIS Course Helper - Brooklyn College
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" color="inherit" underline="hover">
              About
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Contact
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Privacy
            </Link>
          </Box>
        </Box>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Created by Faizan Khan
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;