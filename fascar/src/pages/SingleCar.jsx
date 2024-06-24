import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Booking } from '../components/Booking.tsx'
import { format } from 'date-fns'
import Swal from 'sweetalert2'
import ThreeDCar from '../components/ThreeDCar.jsx'
import { GiCarDoor, GiCarSeat, GiGasPump } from 'react-icons/gi';

const BASE = 'https://fascar-api.onrender.com'

function SingleCar() {
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [haveCar, setHaveCar] = useState(false)
    const [dates, setDates] = useState(null)
    const [days, setDays] = useState()
    const [firstDate, setFirstDate] = useState(null)
    const [lastDate, setLastDate] = useState(null)
    const today = new Date()
    const tod = format(today, "MM-dd-yyyy")
    const { id } = useParams()

    useEffect(() => {
        const checkBooked = async () => {
            if (car.booked === true) {
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
                    }).then((result) => {
                        if (result.isConfirmed) {
                            car.booked = false
                            postCarBooking()
                        }
                    })
                }
            }
        }
        const fetchCar = async () => {
            const response = await fetch(BASE + '/cars/' + id)
            const json = await response.json()
            if (response.ok) {
                setCar(json)
                setHaveCar(true)
            }
        }
        fetchCar()
        if (haveCar) {
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
        }).then((result) => {
            if (result.isConfirmed) {
                let fp = car.price * days
                Swal.fire({
                    position: 'center',
                    title: 'Confirm Dates',
                    text: `That will be $${fp}, are you sure you want to confirm?`,
                    color: "#d4ba75",
                    background: "#1d1d1c",
                    confirmButtonColor: "#5ba95d",
                    cancelButtonColor: 'red',
                    icon: "warning",
                    iconColor: "#d4ba75",
                    showCancelButton: true,
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel"
                }).then((result) => {
                    if (result.isConfirmed) {
                        let timerInterval;
                        Swal.fire({
                            title: "Thank you for booking!",
                            html: "Hope you enjoy your rental!!",
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                                const timer = Swal.getPopup().querySelector("b");
                                timerInterval = setInterval(() => {
                                    timer.textContent = `${Swal.getTimerLeft()}`;
                                }, 100);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
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
                        });
                    }
                })
            }


        })
    }

    const postCarBooking = async () => {
        const editCar = { id: id, booked: car.booked, firstDate: car.firstDate, lastDate: car.lastDate }
        const response = await fetch(BASE + '/cars/' + id, {
            method: 'PATCH',
            body: JSON.stringify(editCar),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            console.log(json.error)
        }
        if (response.ok) {
            navigate('/' + id)
        }
    }

    const getDates = async (data) => {
        setDates(data)
        var diffMs = dates.to - dates.from
        var diffD = Math.floor(diffMs / 86400000) + 1
        setDays(diffD)
        if (dates) {
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

                <img className="car-img" src={`${car.pic}`} />
                <ThreeDCar carName={car.make} />
            </div>
            }
            <div className="single-car-info-container">
                {car && <div className="single-car-details-container">
                    <div className="car-name-center"><h1 className="car-name">{car.year} {car.make} {car.model} </h1></div>
                    <h3 className="car-info">This brand new {car.make} just rolled into our lot with plenty of brand new features including:</h3>
                    <div className='list-spacer'>
                        <ul className="car-features">
                            <li className="car-feature"><span className='icon-space'><GiCarDoor /></span>{car.doors} doors</li>
                            <li className="car-feature"><span className='icon-space'><GiCarSeat /></span>{car.seats} seats</li>
                            <li className="car-feature"><span className='icon-space'><GiGasPump /></span>{car.fueltype}</li>
                        </ul>
                    </div>
                    <div className="center-pricing">
                        <h2 className='car-pricing'>All for you to rent for the price of <span className="money">${car.price}</span>/day</h2>
                    </div>
                </div>}

                {car && car.booked === false && <div className='calendar-container'><Booking getDates={getDates} /></div>}
                {car && car.booked === true && <h2 className='booked-car-text'>Sorry this car is booked until {car.lastDate}</h2>}
                {car && car.booked === false && <button className='book-button' onClick={handleBooking}>Book Car</button>}
            </div>
            <div className="home-button-container">
                <button className='go-home' onClick={handleHome}>Home</button>
            </div>
        </div>
    )
}

export default SingleCar
