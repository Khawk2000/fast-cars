
//Be sure to add filter to main section.
import bugatti from '../assets/Images/bugatti.jpg'
import maserati from '../assets/Images/maserati.jpg'
import porsche from '../assets/Images/porsche.jpg'
import CarCard from "../components/CarCard"

var cars = [
  {
    id: 1,
    carName: 'Bugatti',
    src: bugatti,
    label: 'fast',
    path: '/'
  },
  {
    id: 2,
    carName: 'Maserati',
    src: maserati,
    label: 'fast',
    path: '/'
  },
  {
    id: 3,
    carName: 'Porsche',
    src: porsche,
    label: 'fast',
    path: '/'
  },
  {
    id: 4,
    carName: 'Bugatti',
    src: bugatti,
    label: 'fast',
    path: '/'
  },
  {
    id: 5,
    carName: 'Maserati',
    src: maserati,
    label: 'fast',
    path: '/'
  },
  {
    id: 6,
    carName: 'Porsche',
    src: porsche,
    label: 'fast',
    path: '/'
  }
]

function Home() {



  return (
    <div className="home-container">
      <section className="display-car-container">
        <h1 className='display-text'>Welcome to Fascar Rental Services</h1>
      </section>
      <section className="all-cars-with-filters">
        <ul className="car-cards">{cars.map(car =>
          <CarCard key={car.id} carName={car.carName} src={car.src} label={car.label} path={car.path}/>
        )}
        </ul>
      </section>
    </div>
  )
}

export default Home

