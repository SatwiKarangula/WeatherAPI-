const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({

    city: {
        type: String,
        required: true
    },

    temperature: {
        type: Number,
        required: true
    },

    weather: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('weather', weatherSchema);
