import dfascar from '../assets/Images/FascarLogo.png';
import lfascar from '../assets/Images/lfascar.png';
import { HiOutlineMagnifyingGlass, HiMoon, HiSun } from 'react-icons/hi2';
import { useContext, useState } from 'react';
import { SearchContext, UpdateSearch } from '../context/SearchBar';
import PropTypes from 'prop-types';


function Navbar( { changeMode } ) {
    const [light, setLight] = useState(false);
    const text = useContext(SearchContext)
    const setText = useContext(UpdateSearch)

    const handleMode = () => {
        setLight(!light)
        changeMode(light)
    }
  return (
    <div className='navbar'>
        <div className='logo-container'>
            <img className='logo-pic' src={light? dfascar: lfascar} alt='Fascar Logo' width={70} height={70}/>
            <h1 className='logo-name'>Fascar</h1>
        </div>
        <div className="search-bar-container">
            <HiOutlineMagnifyingGlass className='search-icon'/>
            <input type="text" placeholder='Search Cars' value={text} onChange={(e) => {setText(e.target.value)}}/>
        </div>
        <div className='light-dark-mode-container'>
            {light ? <HiSun onClick={() => handleMode(light)}/>:<HiMoon onClick={() => handleMode(!light)}/>}
        </div>
    </div>
  )
}

Navbar.propTypes = {
    changeMode: PropTypes.func
}

export default Navbar
