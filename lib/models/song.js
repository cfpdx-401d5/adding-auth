const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

module.exports = mongoose.model('Student', schema);