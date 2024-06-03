import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Booking } from '../components/Booking.tsx'


function SingleCar() {
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const fetchCar = async () => {
            const response = await fetch('http://localhost:3500/cars/' + id)
            const json = await response.json()
            if(response.ok){
                setCar(json)
            }
        }
        fetchCar()
    }, [id])

    const handleHome = () => {
        navigate('/')
    }

    return (
        <div className='single-car-container'>
            {!car && <div className='no-car-found-container'>
                <h1>Sorry no car was found with that information</h1>
                <button className="go-home" onClick={handleHome}>Return Home</button>    
            </div>}
            {car && <div className="single-car-pic-container">
                <img src={`${car.pic}`}/>
            </div>
            }
            {car && <div className="single-car-details-container">
                <h1 className="car-name">{car.year} {car.make} {car.model} </h1>
                <h3 className="car-info">This brand new {car.make} just rolled into our lot with plenty of brand new features including:</h3>
                <ul className="car-features">
                    <li className="car-feature">{car.doors} doors</li>
                    <li className="car-feature">{car.seats} seats</li>
                    <li className="car-feature">Fuel Type: {car.fueltype}</li>
                </ul>
                <h2 className='car-pricing'>All for you to rent for the price of ${car.price}/hour</h2>
            </div>
            }   
            {car && car.booked === false && <div><Booking /></div>
            }
            {car && car.booked === true && <h2 className='booked-car-text'>Sorry this car is booked until {car.lastDate}</h2>}
            <button className='go-home' onClick={handleHome}>Home</button>
        </div>
    )
}

export default SingleCar
