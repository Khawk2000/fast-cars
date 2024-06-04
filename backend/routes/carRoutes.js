const express = require('express')
const router = express.Router()
const carController = require('../controllers/carController')

router.get('/', carController.getAllCars)
router.get('/:id', carController.getSingleCar)
router.post('/', carController.createNewCar)
router.patch('/', carController.updateCar)
router.delete('/', carController.deleteCar)

module.exports = router