import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StocksTable from './components/StocksTable.jsx'
import AddCoin from './components/AddCoin.jsx'

function App() {

  const [reload, setReload] = useState(0);
  const forceReload = () => {
    setReload(r => r + 1);
  };

  return (
    <>
      <StocksTable reload={reload} bananas={"okay"} ></StocksTable>
      <AddCoin onCloseReload={forceReload} ></AddCoin>
    </>
  )
}

export default App
