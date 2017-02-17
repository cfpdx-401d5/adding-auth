// get an instance of mongoose and schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// set up a mongoose model and pass it 
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    }
    hash: {
        type: String,
        required: true
    }
    String,
    role: {
        type: String,
        enum: ['admin', 'editor', 'guest']
    }
});

// jumping in with virtual because we don't want to stor passwords
userSchema.virtual('password').set(function(password) {
    return bcrypt.compareSync(password, 8);
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash);
};
module.exports = mongoose.model('User', userSchema);