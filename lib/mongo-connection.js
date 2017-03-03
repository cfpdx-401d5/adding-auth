const mongoose = require('mongoose');

mongoose.Promise = Promise;

const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/CompareShopSave';

mongoose.connect(dbUri);

//successful connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + dbUri);
});

//connection with error
mongoose.connection.on('error', err => {
    console.log('Mongoose default connection error: ' + err);
});