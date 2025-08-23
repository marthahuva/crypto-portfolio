import { useState, useEffect } from 'react'
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import './App.css'
import EnhancedTable from './components/EnhancedTable.jsx'
import AddCoin from './components/AddCoin.jsx'
import PortfolioPie from './components/PortfolioPie.jsx';
import theme from './theme/theme.js';
import Navbar from './components/Navbar';
import axios from "axios";
import ScoreCards from './components/ScoreCards.jsx';
import PortfolioROI from './components/PortfolioROI.jsx';
import { Box } from '@mui/material';

function App() {
  const [reload, setReload] = useState(0);
  const [rows, setRows] = useState([]);

  const forceReload = () => {
    setReload(r => r + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/portafolio?user=rafakitlhdez@gmail.com");
        setRows(res.data);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };
    fetchData();
  }, [reload]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container sx={{ mt: 4 }}>
        {/* ✅ Score cards dummy */}
        <ScoreCards />

        {/* ✅ Tabla */}
        <EnhancedTable reload={reload} rows={rows} />

        {/* ✅ Formulario */}
        <AddCoin onCloseReload={forceReload} />
        {/* 📊 Centrar PortfolioPie y PortfolioROI */}

        <div>
          {/* ✅ Pie Chart */}
          <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', // centra horizontalmente
            alignItems: 'center',     // centra verticalmente
            gap: 4,                   // espacio entre los dos componentes
            mt: 4,                    // margen superior
            flexWrap: 'wrap',         // que se ajusten en pantallas pequeñas
          }}
        ></Box>
          <PortfolioPie rows={rows} />
          <PortfolioROI rows={rows} />
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default App
