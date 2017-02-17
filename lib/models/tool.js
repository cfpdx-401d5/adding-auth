// get our mongoose setup
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// setup the mongoose model and export it
module.exports = mongoose.model(Tool, new Schema({
    name: {
        type: String,
        required: true
    },
    type: String,
    description: String
}));