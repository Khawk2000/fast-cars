const Car = require('../models/Car')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')


//@desc Get all cars
//@route GET /cars
//@access Private
const getAllCars = asyncHandler(async (req, res) => {
    const cars = await Car.find().lean()
    if(!cars?.length){
        return res.status(400).json({message: 'No cars found'})
    }
    res.json(cars)
})

//@desc Get all cars
//@route GET /cars
//@access Private
const getSingleCar = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Car does not exist'})
    }

    const car = await Car.findById(id)

    if(!car){
        return res.status(404).json({error: 'Car does not exist'})
    }

    res.status(200).json(car)

})



//@desc Create new user
//@route POST /users
//@access Private
const createNewCar = asyncHandler(async (req, res) => {
    const { make, model, year, fueltype, doors, seats, price } = req.body

    //Confirm data
    if(!make || !model || !year || !fueltype || !doors || !seats || !price ){
        return res.status(400).json({ message: 'All fields are required' })
    }

    //Compiling data
    const carObject = {make, model, year, fueltype, doors, seats, price}

    //Create and store new user
    const car = await Car.create(carObject)

    if(car) //created
    {
        res.status(201).json({ message: `New car: ${car._id} created`})
    }else{
        res.status(400).json({ message: 'Invalid user data received'})
    }

})

//@desc Update a user
//@route PATCH /users
//@access Private
const updateCar = asyncHandler(async (req, res) => {
    const { id, make, model, year, fueltype, doors, seats, price, firstDate, lastDate, booked } = req.body

    //Confirm data
    if(!id || !price){
        return res.status(400).json({ message: 'All fields are required'})
    }

    const car = await Car.findById(id).exec()

    if(!car){
        return res.status(400).json({message: "Car not found"})
    }

    if(make !== undefined) car.make = make
    if(model !== undefined) car.model = model
    if(year !== undefined) car.year = year
    if(fueltype !== undefined) car.fueltype = fueltype
    if(doors !== undefined) car.doors = doors
    if(seats !== undefined) car.seats = seats
    if(firstDate !== undefined) car.firstDate = firstDate
    if(lastDate !== undefined) car.lastDate = lastDate
    if(booked !== undefined) car.booked = booked

    car.price = price

    const updatedCar = await car.save()

    res.json({message: `${updatedCar.id} updated`})
})


//@desc Delete a car
//@route DELETE /cars
//@access Private
const deleteCar = asyncHandler(async (req, res) => {
    const { id } = req.body
    
    if(!id){
        return res.status(400).json({message: 'Car ID Required'})
    }

    const car = await Car.findById(id).exec()

    if(!car){
        return res.status(400).json({ message: 'Car not found'})
    }

    const result = await car.deleteOne()

    const reply = `Car with ID ${id} deleted`

    res.json(reply)
})


module.exports = {
    getAllCars,
    getSingleCar,
    createNewCar,
    updateCar,
    deleteCar
}