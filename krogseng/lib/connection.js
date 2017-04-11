// connect to the database

const mongoose = require('mongoose');
const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/tools';

module.exports = mongoose.connect(dbUri);
mongoose.connection.on('connected', () => {
    console.log('connected to mongo');
});