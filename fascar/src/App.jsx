import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleCar from './pages/SingleCar';
import Login from './pages/Login';
import { SearchContext, UpdateSearch } from './context/SearchBar';

function App() {
  const [light, setLight] = useState(true)
  const [search, setSearch] = useState('')

  const changeMode = (light) => {
    setLight(light)
    console.log(light)
  }



  return (
    <div className='App' data-theme={light ? 'light' : 'dark'}>
      <Router>
        <SearchContext.Provider value={search}>
          <UpdateSearch.Provider value={setSearch}>
            <Navbar changeMode={changeMode} />
            <Routes>
              <Route path='/auth/login' Component={Login} />
              <Route path='/:id' Component={SingleCar} />
              <Route path='/' exact Component={Home} />
            </Routes>
          </UpdateSearch.Provider>
        </SearchContext.Provider>
      </Router>
    </div>
  )
}

export default App
