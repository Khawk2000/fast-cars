import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

function App() {
  const [light, setLight] = useState(true)

  const changeMode = (light) => {
    setLight(light)
    console.log(light)
  }

  return (
    <div className='App' data-theme={light ? 'light' : 'dark'}>
      <Router>
        <Navbar changeMode={changeMode}/>
        <Routes>
          <Route path='/' exact Component={Home}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
