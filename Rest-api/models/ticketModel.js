const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    seat: {
        type:  Number,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    playId: {
        type: ObjectId,
        ref: 'Play',
        required: true
    },
    bookingId: {
        type: ObjectId,
        ref: "Booking",
        required: true
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Ticket', ticketSchema);
