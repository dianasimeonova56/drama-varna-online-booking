const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { bookingController } = require('../controllers');

// middleware that is specific to this router
router.get('/:userId/', bookingController.getBookings);

router.get('/:userId/:bookingId',  bookingController.getBooking);

router.post('/create-booking',  bookingController.createBooking);

router.put('/:bookingId/edit', bookingController.editBooking);

router.delete('/:bookingId/delete',  bookingController.deleteBooking)

module.exports = router
