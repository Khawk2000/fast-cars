const express = require('express')
const router = express.Router()
const carController = require('../controllers/carController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.get('/', carController.getAllCars)
router.get('/:id', carController.getSingleCar)
router.post('/', carController.createNewCar)
router.patch('/:id', carController.updateCar)
router.delete('/:id', carController.deleteCar)

module.exports = router