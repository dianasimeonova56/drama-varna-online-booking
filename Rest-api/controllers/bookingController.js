const { bookingModel, playModel } = require('../models');

function newBooking(bookingData) {
    return bookingModel.create(bookingData);
}

function getBookings(req, res, next) {
    // Optionally add filtering by user or play via query params if needed
    bookingModel.find()
        .populate('userId', 'username email')
        .populate('playId', 'playName date')
        .then(bookings => {
            res.status(200).json(bookings);
        })
        .catch(next);
}

function getBooking(req, res, next) {
    const { bookingId } = req.params;

    bookingModel.findById(bookingId)
        .populate('userId', 'username email')
        .populate('playId', 'playName date')
        .then(booking => {
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.status(200).json(booking);
        })
        .catch(next);
}

async function createBooking(req, res, next) {
  const { bookingData } = req.body;

  try {
    const play = await playModel.findById(bookingData.playId);
    if (!play) {
      return res.status(404).json({ message: 'Play not found' });
    }

    if (new Date(play.date) < new Date()) {
      return res.status(400).json({ message: 'Cannot book past plays' });
    }

    const createdBooking = await newBooking(bookingData);

    // Generate tickets AFTER booking is created
    const tickets = await generateTicketsForBooking(createdBooking);

    res.status(201).json({ booking: createdBooking, tickets });
  } catch (err) {
    next(err);
  }
}

function editBooking(req, res, next) {
    const { bookingId } = req.params;
    const { bookingData } = req.body;

    bookingModel.findByIdAndUpdate(bookingId, bookingData, { new: true })
        .then(updatedBooking => {
            if (updatedBooking) {
                res.status(200).json(updatedBooking);
            } else {
                res.status(404).json({ message: 'Booking not found' });
            }
        })
        .catch(next);
}

function deleteBooking(req, res, next) {
    const { bookingId } = req.params;

    bookingModel.findByIdAndDelete(bookingId)
        .then(deletedBooking => {
            if (deletedBooking) {
                res.status(200).json(deletedBooking);
            } else {
                res.status(404).json({ message: 'Booking not found' });
            }
        })
        .catch(next);
}

module.exports = {
    newBooking,
    getBooking,
    getBookings,
    createBooking,
    editBooking,
    deleteBooking,
};
