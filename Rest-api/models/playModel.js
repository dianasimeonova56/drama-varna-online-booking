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
    date: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, 'Invalid image url!']
    },
    director: [{
        type: ObjectId,
        ref: 'Director',
    }],
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

playSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) return 0;
    const sum = this.ratings.reduce((total, r) => total + r.rating, 0);
    return sum / this.ratings.length;
});

playSchema.set('toJSON', { virtuals: true });
playSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Play', playSchema);
