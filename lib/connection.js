const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/auth-lab';

module.exports = mongoose.connect(dbUri);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo!');
});