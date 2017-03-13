// get an instance of mongoose and schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');

// set up a mongoose model and pass it 
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'guest']
    }
});

// jumping in with virtual because we don't want to store passwords
userSchema.virtual('password').set(function(password) {
    this.hash = bcryptjs.hashSync(password, 8);
});

userSchema.methods.comparePassword = function(password) {
    return bcryptjs.compareSync(password, this.hash);
};
module.exports = mongoose.model('User', userSchema);