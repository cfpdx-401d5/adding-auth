// configure the database 
module.exports = {
    'secret': 'supersecretthings',
    'database': 'mongodb://'
}


const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./app/models/user');