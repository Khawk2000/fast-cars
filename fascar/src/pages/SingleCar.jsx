import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Booking } from '../components/Booking.tsx'
import { format } from 'date-fns'
import Swal from 'sweetalert2'
import ThreeDCar from '../components/ThreeDCar.jsx'


function SingleCar() {
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [haveCar, setHaveCar] = useState(false)
    const [dates, setDates] = useState(null)
    const [firstDate, setFirstDate] = useState(null)
    const [lastDate, setLastDate] = useState(null)
    const today = new Date()
    const tod = format(today, "MM-dd-yyyy")
    const { id } = useParams()

    useEffect(() => {
        const checkBooked = async () => {
            if (car.booked === true) {
                console.log(car.lastDate, tod)
                console.log(car.lastDate < tod)
                if (car.lastDate < tod) {
                    car.booked = false
                    Swal.fire({
                        position: 'center',
                        title: 'Checking Availability',
                        color: "#d4ba75",
                        background: "#1d1c1c",
                        confirmButtonColor: "#7286a0",
                        icon: "info",
                        iconColor: "#d4ba75"
                    }).then((result) =>{
                        if(result.isConfirmed) {
                            car.booked = false
                            postCarBooking()
                        }
                    })
                    console.log('no longer booked')
                } else {
                    console.log('car is booked')
                }
            } else {
                console.log('car is not booked')
            }
        }
        const fetchCar = async () => {
            const response = await fetch('http://localhost:3500/cars/' + id)
            const json = await response.json()
            if (response.ok) {
                setCar(json)
                setHaveCar(true)
            }
        }
        fetchCar()
        if(haveCar) {
            checkBooked()
        }
    }, [id, tod, haveCar])



    const handleHome = () => {
        navigate('/')
    }

    const handleBooking = async () => {
        Swal.fire({
            position: 'center',
            title: 'Confirm Dates',
            text: `Are you sure you want to book this car from ${firstDate} - ${lastDate}?`,
            color: "#d4ba75",
            background: "#1d1c1c",
            confirmButtonColor: "#7286a0",
            icon: "warning",
            iconColor: "#d4ba75",
            showCancelButton: true,
            confirmButtonText: "Book Now",
            cancelButtonText: "Cancel"
        }).then((result) =>{
            if(result.isConfirmed) {
                if (lastDate === '') {
                    car.lastDate = firstDate
                    car.firstDate = ""
                } else {
                    car.firstDate = firstDate
                    car.lastDate = lastDate
                }
                car.booked = true
                postCarBooking()
            }
        })
        console.log(car)
    }
 
    const postCarBooking = async () => {
        const editCar = { id: id, booked: car.booked, firstDate: car.firstDate, lastDate: car.lastDate}
        console.log(editCar)
        const response = await fetch('http://localhost:3500/cars/' + id, {
            method: 'PATCH',
            body: JSON.stringify(editCar),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }
        if(response.ok){
            console.log(json)
            console.log('Updated car' + car._id)
            window.location.reload()
        }
    }

    const getDates = async (data) => {
        setDates(data)
        if(dates) {
            if (dates.from !== undefined) {
                setFirstDate(format(dates.from, "MM-dd-yyyy"))
            }
            if (dates.to !== undefined) {
                setLastDate(format(dates.to, "MM-dd-yyyy"))
            }
        }
    }
    return (
        <div className='single-car-container'>
            
            {!car && <div className='no-car-found-container'>
                <h1>Sorry no car was found with that information</h1>
                <button className="go-home" onClick={handleHome}>Return Home</button>
            </div>}
            {car && <div className="single-car-pic-container">
                
                <img className="car-img"src={`${car.pic}`} />
                <ThreeDCar carName={car.make}/>
            </div>
            }
            <div className="single-car-info-container">
                {car && <div className="single-car-details-container">
                    <h1 className="car-name">{car.year} {car.make} {car.model} </h1>
                    <h3 className="car-info">This brand new {car.make} just rolled into our lot with plenty of brand new features including:</h3>
                    <ul className="car-features">
                        <li className="car-feature">{car.doors} doors</li>
                        <li className="car-feature">{car.seats} seats</li>
                        <li className="car-feature">Fuel Type: {car.fueltype}</li>
                    </ul>
                    <h2 className='car-pricing'>All for you to rent for the price of ${car.price}/hour</h2>
                </div>}
            </div>
            {car && car.booked === false && <div><Booking getDates={getDates} /></div>}
            {car && car.booked === true && <h2 className='booked-car-text'>Sorry this car is booked until {car.lastDate}</h2>}
            {car && car.booked === false && <button className='book-button' onClick={handleBooking}>Book Car</button>}

            <button className='go-home' onClick={handleHome}>Home</button>
        </div>
    )
}

export default SingleCar
