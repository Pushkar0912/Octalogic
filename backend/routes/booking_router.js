const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController')

router.post('/insertData',bookingController.insertData);
router.get('/getVehicleType/:wheel',bookingController.getVehicleType);
router.get('/getVehicleModel/:uuid',bookingController.getVehicleModel);
router.post('/bookVehicle',bookingController.bookVehicle);

module.exports = router;