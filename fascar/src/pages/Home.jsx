
//Be sure to add filter to main section.
import { useState, useEffect, useContext } from 'react'
import CarCard from "../components/CarCard"
import { SearchContext } from '../context/SearchBar'

function Home() {
  const [dcars, setDCars] = useState(null)
  const text = useContext(SearchContext)

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch('http://localhost:3500/cars')
      const json = await response.json()
      if(response.ok){
        setDCars(json)
      }else{
        console.log("Status " + response.status)
      }
    }
    fetchCars()
  },[])

  return (
    <div className="home-container">
      <section className="display-car-container">
        <h1 className='display-text'>Welcome to Fascar Rental Services</h1>
      </section>
      <section className="all-cars-with-filters">
        <h1 className="car-list-title">Some of our best</h1>
        {dcars && <ul className="car-cards">{dcars.filter(dcar => dcar.make.includes(text) || dcar.make.toLowerCase().includes(text) || dcar.model.includes(text) || dcar.model.toLowerCase().includes(text) || dcar.year.toLowerCase().includes(text)).map(dcar =>
          <CarCard key={dcar._id} make={dcar.make} model={dcar.model} src={dcar.pic} year={dcar.year} path={`/${dcar._id}`}/>
        )}
        </ul>}
      </section>
    </div>
  )
}

export default Home

