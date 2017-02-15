const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
});

userSchema.virtual('password').set(password => {
    this.hash = bcrypt.hashSync(password, 10);
});

userSchema.methods.comparePassword = password => {
    return bcrypt.compareSync(password, this.hash);
};

module.exports = mongoose.model('User', userSchema);