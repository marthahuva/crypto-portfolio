import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a3b2e', // Verde oscuro principal
      light: '#2d5a47',
      dark: '#0f261c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4CAF50', // Verde brillante del logo
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#ffffff',
    },
    success: {
      main: '#00E676',
      light: '#69F0AE',
      dark: '#00C853',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a3b2e',
      secondary: '#546e7a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1a3b2e',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1a3b2e',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#1a3b2e',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#1a3b2e',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#1a3b2e',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#1a3b2e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
          boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
            boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(26, 59, 46, 0.08)',
          border: '1px solid rgba(76, 175, 80, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 48px rgba(26, 59, 46, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1a3b2e 0%, #2d5a47 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(76, 175, 80, 0.2)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;