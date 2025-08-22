import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Fab,
  useTheme,
  alpha,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import MarketStats from './MarketStats';
import PriceChart from './PriceChart';
import CryptoCard from './CryptoCard';
import AddCryptoModal from './AddCryptoModal';

const Dashboard = () => {
  const theme = useTheme();
  const [cryptos, setCryptos] = useState([
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 43250.00,
      change24h: 2.45,
      change7d: 5.67,
      marketCap: 847392847392,
      volume24h: 15847392847,
      image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
      isFavorite: true,
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2650.50,
      change24h: -1.23,
      change7d: 8.45,
      marketCap: 318472847392,
      volume24h: 8847392847,
      image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
      isFavorite: false,
    },
    {
      id: 'binancecoin',
      name: 'BNB',
      symbol: 'BNB',
      price: 315.75,
      change24h: 3.67,
      change7d: -2.15,
      marketCap: 47392847392,
      volume24h: 2847392847,
      image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
      isFavorite: true,
    },
  ]);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleToggleFavorite = (cryptoId) => {
    setCryptos((prev) =>
      prev.map((crypto) =>
        crypto.id === cryptoId
          ? { ...crypto, isFavorite: !crypto.isFavorite }
          : crypto
      )
    );
  };

  const handleAddCrypto = (newCrypto) => {
    setCryptos((prev) => {
      // Verificar si la crypto ya existe
      const exists = prev.find((crypto) => crypto.id === newCrypto.id);
      if (exists) {
        return prev; // No agregar duplicados
      }
      return [...prev, newCrypto];
    });
  };

  const handleRemoveCrypto = (cryptoId) => {
    setCryptos((prev) => prev.filter((crypto) => crypto.id !== cryptoId));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        pt: 10, // Para compensar el navbar fijo
        pb: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #1a3b2e 0%, #4CAF50 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 1,
            }}
          >
            Crypto Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
            }}
          >
            Monitorea tus criptomonedas favoritas en tiempo real
          </Typography>
        </Box>

        {/* Market Stats */}
        <MarketStats />

        {/* Price Chart */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: 'text.primary',
            }}
          >
            Price Analysis
          </Typography>
          <PriceChart title="Bitcoin Price Chart" />
        </Box>

        {/* Crypto Cards Grid */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: 'text.primary',
            }}
          >
            My Portfolio ({cryptos.length} coins)
          </Typography>
          
          {cryptos.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 4,
                backgroundColor: 'white',
                borderRadius: 3,
                border: '2px dashed rgba(76, 175, 80, 0.3)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                No tienes criptomonedas en tu portfolio
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 3,
                }}
              >
                Agrega algunas criptomonedas para comenzar a monitorear sus precios
              </Typography>
              <Fab
                variant="extended"
                color="primary"
                onClick={() => setAddModalOpen(true)}
                sx={{
                  background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
                }}
              >
                <Add sx={{ mr: 1 }} />
                Agregar Crypto
              </Fab>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {cryptos.map((crypto) => (
                <Grid item xs={12} sm={6} lg={4} key={crypto.id}>
                  <CryptoCard
                    {...crypto}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Performance Summary */}
        {cryptos.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: 'text.primary',
              }}
            >
              Portfolio Summary
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {cryptos.filter(c => c.change24h > 0).length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Coins in Profit (24h)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {cryptos.filter(c => c.change24h < 0).length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Coins in Loss (24h)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {cryptos.filter(c => c.isFavorite).length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Favorite Coins
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        onClick={() => setAddModalOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
          boxShadow: '0 8px 32px rgba(76, 175, 80, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
            boxShadow: '0 12px 48px rgba(76, 175, 80, 0.6)',
          },
        }}
      >
        <Add />
      </Fab>

      {/* Add Crypto Modal */}
      <AddCryptoModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddCrypto={handleAddCrypto}
      />
    </Box>
  );
};

export default Dashboard;