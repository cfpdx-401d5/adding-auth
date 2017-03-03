const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/dogs';

module.exports = mongoose.connect(dbUri);

mongoose.connection.om('connected', () => {
    console.log('connected to mongo db');
});