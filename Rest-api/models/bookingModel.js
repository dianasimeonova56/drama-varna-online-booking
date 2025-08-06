const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  playId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Play',
    required: true
  },
  seats: {
    type: Number,
    required: true,
    min: 1
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
