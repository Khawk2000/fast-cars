
//Be sure to add filter to main section.
import { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import CarCard from "../components/CarCard"

function Home() {
  const [dcars, setDCars] = useState(null)
  const refresh = useRefreshToken()

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
        {dcars && <ul className="car-cards">{dcars.map(dcar =>
          <CarCard key={dcar._id} make={dcar.make} model={dcar.model} src={dcar.pic} year={dcar.year} path={`/${dcar._id}`}/>
        )}
        </ul>}
      </section>
      <button onClick={() => refresh()}>Refresh</button>
    </div>
  )
}

export default Home

