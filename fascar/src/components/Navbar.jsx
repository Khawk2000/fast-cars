import dfascar from '../assets/Images/FascarLogo.png';
import lfascar from '../assets/Images/lfascar.png';
import { HiOutlineMagnifyingGlass, HiMoon, HiSun, HiUser, HiCog6Tooth } from 'react-icons/hi2';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'


function Navbar( { changeMode } ) {
    const [light, setLight] = useState(false);
    const [logged, setLogged] = useState(false);
    const navigate = useNavigate()


    const handleMode = () => {
        setLight(!light)
        changeMode(light)
    }

    const handleLogin = () => {
        navigate('/auth/login')
        console.log('trying to login')
        setLogged(!logged)
    }

    const handleMenu = () => {
        console.log('trying to menu')
        setLogged(!logged)
    }
  return (
    <div className='navbar'>
        <div className='logo-container'>
            <img className='logo-pic' src={light? dfascar: lfascar} alt='Fascar Logo' width={70} height={70}/>
            <h1 className='logo-name'>Fascar</h1>
        </div>
        <div className="search-bar-container">
            <HiOutlineMagnifyingGlass className='search-icon'/>
            <input type="text" placeholder='Search Cars'/>
        </div>
        <div className='light-dark-mode-container'>
            {light ? <HiSun onClick={() => handleMode(light)}/>:<HiMoon onClick={() => handleMode(!light)}/>}
        </div>
        <div className="user-container">
            {!logged ? <HiUser onClick={handleLogin}/> : <HiCog6Tooth onClick={handleMenu}/>}
        </div>
    </div>
  )
}

Navbar.propTypes = {
    changeMode: PropTypes.func
}

export default Navbar
