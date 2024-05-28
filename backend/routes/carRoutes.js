const express = require('express')
const router = express.Router()
const carController = require('../controllers/carController')

router.route('/')
    .get(carController.getAllCars)
    .get(carController.getSingleCar)
    .post(carController.createNewCar)
    .patch(carController.updateCar)
    .delete(carController.deleteCar)

module.exports = router