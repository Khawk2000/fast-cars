
//Be sure to add filter to main section.

import CarCard from "../components/CarCard"

var cars = [
  {
    id: 1,
    carName: 'Bugatti'
  },
  {
    id: 2,
    carName: 'Mazeratti'
  },
  {
    id: 3,
    carName: 'Porsche'
  },
  {
    id: 4,
    carName: 'Lambo'
  },
]

function Home() {
  return (
    <div className="home-container">
      <section className="display-car-container">

      </section>
      
      <section className="all-cars-with-filters">
        {cars.map(car =>
          <CarCard key={car.id} carName={car.carName}/>
        )}
      </section>
    </div>
  )
}

export default Home

