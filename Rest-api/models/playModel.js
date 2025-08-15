const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const playSchema = new mongoose.Schema({
    playName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    playDate: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, 'Invalid image url!']
    },
    director: {
        type: String,
    },
    totalSeats: {
        type: Number,
    },
    availableSeats: {
        type: Number,
    },
    ratings: [{
        user: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        }
    }]

}, { timestamps: { createdAt: 'created_at' } });

playSchema.pre('save', function (next) {
    const seatCapacities = {
        'Main Stage': 50,
        'Secondary Stage': 25,
        'Opera': 30
    };
    if (seatCapacities[this.place]) {
        this.totalSeats = seatCapacities[this.place];
    }
    if (this.isNew && (this.availableSeats === undefined || this.availableSeats === null)) {
        this.availableSeats = this.totalSeats;
    }
    next();
});


playSchema.virtual('averageRating').get(function () {
    if (!this.ratings) return 0;
    const sum = this.ratings.reduce((total, r) => total + r.rating, 0);
    return sum / this.ratings.length;
});


playSchema.set('toJSON', { virtuals: true });
playSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Play', playSchema);
