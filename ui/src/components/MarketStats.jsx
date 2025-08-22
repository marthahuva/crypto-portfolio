import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  ShowChart,
} from '@mui/icons-material';

const MarketStats = () => {
  const marketData = {
    totalMarketCap: 1847392847392,
    volume24h: 84739284739,
    btcDominance: 52.4,
    ethDominance: 17.2,
    defiTvl: 87392847392,
    fearGreedIndex: 68,
    marketCapChange: 2.4,
    volumeChange: -5.2,
  };

  const formatCurrency = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${(value / 1e3).toFixed(2)}K`;
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'primary' }) => {
    const isPositive = change >= 0;
    
    return (
      <Card
        sx={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)',
          border: '1px solid rgba(76, 175, 80, 0.1)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: `${color}.main`,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon />
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                {title}
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: 'text.primary',
                }}
              >
                {value}
              </Typography>
              
              <Chip
                icon={isPositive ? <TrendingUp /> : <TrendingDown />}
                label={`${isPositive ? '+' : ''}${change}%`}
                size="small"
                sx={{
                  backgroundColor: isPositive 
                    ? 'rgba(0, 230, 118, 0.1)' 
                    : 'rgba(244, 67, 54, 0.1)',
                  color: isPositive ? 'success.main' : 'error.main',
                  fontWeight: 600,
                  '& .MuiChip-icon': {
                    color: isPositive ? 'success.main' : 'error.main',
                  },
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const DominanceCard = () => (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)',
        border: '1px solid rgba(76, 175, 80, 0.1)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <ShowChart color="primary" />
          Market Dominance
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Bitcoin (BTC)
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {marketData.btcDominance}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={marketData.btcDominance}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#FF9800',
                borderRadius: 4,
              },
            }}
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Ethereum (ETH)
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {marketData.ethDominance}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={marketData.ethDominance}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#627EEA',
                borderRadius: 4,
              },
            }}
          />
        </Box>
        
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Others
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {(100 - marketData.btcDominance - marketData.ethDominance).toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={100 - marketData.btcDominance - marketData.ethDominance}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#4CAF50',
                borderRadius: 4,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );

  const FearGreedCard = () => {
    const getFearGreedColor = (index) => {
      if (index <= 25) return '#f44336'; // Extreme Fear - Red
      if (index <= 45) return '#ff9800'; // Fear - Orange
      if (index <= 55) return '#ffeb3b'; // Neutral - Yellow
      if (index <= 75) return '#8bc34a'; // Greed - Light Green
      return '#4caf50'; // Extreme Greed - Green
    };

    const getFearGreedLabel = (index) => {
      if (index <= 25) return 'Extreme Fear';
      if (index <= 45) return 'Fear';
      if (index <= 55) return 'Neutral';
      if (index <= 75) return 'Greed';
      return 'Extreme Greed';
    };

    return (
      <Card
        sx={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)',
          border: '1px solid rgba(76, 175, 80, 0.1)',
        }}
      >
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <AccountBalance color="primary" />
            Fear & Greed Index
          </Typography>
          
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: `conic-gradient(${getFearGreedColor(marketData.fearGreedIndex)} 0deg ${marketData.fearGreedIndex * 3.6}deg, rgba(0,0,0,0.1) ${marketData.fearGreedIndex * 3.6}deg 360deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: getFearGreedColor(marketData.fearGreedIndex),
                  }}
                >
                  {marketData.fearGreedIndex}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: getFearGreedColor(marketData.fearGreedIndex),
              mb: 1,
            }}
          >
            {getFearGreedLabel(marketData.fearGreedIndex)}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Market sentiment indicator
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 3,
          color: 'text.primary',
        }}
      >
        Market Overview
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Market Cap"
            value={formatCurrency(marketData.totalMarketCap)}
            change={marketData.marketCapChange}
            icon={AccountBalance}
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="24h Volume"
            value={formatCurrency(marketData.volume24h)}
            change={marketData.volumeChange}
            icon={ShowChart}
            color="secondary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <DominanceCard />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <FearGreedCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarketStats;