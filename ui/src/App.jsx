import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EnhancedTable from './components/EnhancedTable.jsx'
import AddCoin from './components/AddCoin.jsx'

function App() {

  const [reload, setReload] = useState(0);
  const forceReload = () => {
    setReload(r => r + 1);
  };

  return (
    <>
      <EnhancedTable reload={reload} bananas={"okay"} ></EnhancedTable>
      <AddCoin onCloseReload={forceReload} ></AddCoin>
    </>
  )
}

export default App
