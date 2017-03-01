process.env.MONGODB_URI = 'mongodb://localhost:27017/shopping-test';
require('../lib/mongo-connection');
const mongoose = require('mongoose');

before(() => mongoose.connection.dropDatabase());