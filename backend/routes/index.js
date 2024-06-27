const express = require('express');
const router = express.Router()
const cors = require('cors');
const bookingRouter = require("./booking_router")
require('dotenv').config()

router.use(cors());
router.use('/api',  bookingRouter);


module.exports =router;