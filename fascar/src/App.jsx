import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { useState } from 'react';

function App() {
  const [light, setLight] = useState(true)

  const changeMode = (light) => {
    setLight(light)
    console.log(light)
  }

  return (
    <div className='App' data-theme={light ? 'light' : 'dark'}>
      <Navbar changeMode={changeMode}/>
      <Home/>
    </div>
  )
}

export default App
