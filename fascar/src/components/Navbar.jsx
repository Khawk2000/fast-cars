import Fascar from '../assets/Images/FascarLogo.svg';
import { HiOutlineMagnifyingGlass, HiMoon, HiSun } from 'react-icons/hi2';
import { useState } from 'react';

function Navbar() {
    const [light, setLight] = useState(false)

  return (
    <div className='navbar'>
        <div className='logo-container'>
            <img className='logo-pic' src={Fascar} alt='Fascar Logo' width={70} height={70}/>
            <h1 className='logo-name'>Fascar</h1>
        </div>
        <div className="search-bar-container">
            <HiOutlineMagnifyingGlass/>
            <input type="text" />
        </div>
        <div className='light-dark-mode-container'>
            {light?<HiMoon onClick={() => setLight(!light)}/>:<HiSun onClick={() => setLight(!light)}/>}
        </div>
    </div>
  )
}

export default Navbar
