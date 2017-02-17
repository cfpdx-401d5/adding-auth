// get an instance of mongoose and schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it 
module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'editor', 'guest']
    }
}));