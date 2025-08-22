import { useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EnhancedTable from './components/EnhancedTable.jsx'
import AddCoin from './components/AddCoin.jsx'
import theme from './theme/theme.js';
import Navbar from './components/Navbar';
import PortfolioPie from './components/PortfolioPie.jsx';
// import Dashboard from './components/Dashboard';

function App() {

  const [reload, setReload] = useState(0);
  const forceReload = () => {
    setReload(r => r + 1);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navbar />
        {/* <Dashboard /> */}
      </div>
      <EnhancedTable reload={reload} bananas={"okay"} ></EnhancedTable>
      <AddCoin onCloseReload={forceReload} ></AddCoin>
      <PortfolioPie/>
      </ThemeProvider>
    </>
  )
}

export default App
