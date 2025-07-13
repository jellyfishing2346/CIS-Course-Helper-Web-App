// Copy this to: client/src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0056b3',
      light: '#e6f0ff',
      dark: '#003d80',
    },
    secondary: {
      main: '#6c757d',
      light: '#f8f9fa',
      dark: '#495057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#343a40',
      secondary: '#6c757d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#0056b3',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#0056b3',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '12px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;