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
    location: {
        type: String,
        required: true
    },
    seat: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
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
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Ticket', ticketSchema);
