import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import {
  AccountCircle,
  Notifications,
  Settings,
  TrendingUp,
  Wallet,
  Search,
} from '@mui/icons-material';
import DogLogo from './DogLogo';

const Navbar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        {/* Logo y nombre */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <DogLogo fontSize="large" sx={{ mr: 1.5 }} />
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ffffff 0%, #4CAF50 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            CryptoDog
          </Typography>
        </Box>

        {/* Navegación principal */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<TrendingUp />}
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
              },
            }}
          >
            {/* Dashboard
          </Button>
          <Button
            color="inherit"
            startIcon={<Wallet />}
            sx={{
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                color: 'rgba(255,255,255,0.9)',
              },
            }} 
            >*/}
          
            Portfolio
          </Button>
          <Button
            color="inherit"
            startIcon={<Search />}
            sx={{
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                color: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            {/* Market */}
          </Button>
        </Box>

        {/* Stats rápidas */}
        {/* <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 2, mr: 3 }}>
          <Chip
            label="BTC: $43,250"
            size="small"
            sx={{
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              color: 'white',
              fontWeight: 600,
            }}
          />
          <Chip
            label="Market: +2.4%"
            size="small"
            sx={{
              backgroundColor: 'rgba(0, 230, 118, 0.2)',
              color: '#00E676',
              fontWeight: 600,
            }}
          />
        </Box> */}

        {/* Iconos de acción */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="large"
            color="inherit"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
              },
            }}
          >
            <Notifications />
          </IconButton>
          
          <IconButton
            size="large"
            color="inherit"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
              },
            }}
          >
            <Settings />
          </IconButton>

          {/* Avatar del usuario */}
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
            sx={{ ml: 1 }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: theme.palette.secondary.main,
                fontSize: '0.9rem',
              }}
            >
              JD
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>Perfil</MenuItem>
            <MenuItem onClick={handleClose}>Configuración</MenuItem>
            <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;