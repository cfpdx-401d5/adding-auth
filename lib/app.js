const app = require('express')();
const morgan = require('morgan')('dev');
const errorHandler = require('./error-handler')();
const dogs = require('./routes/dogs');
const auth = require('./routes/auth');
const ensureAuth = require('./auth/ensure-auth');

app.use(morgan);

app.use('/auth', auth);
app.use('/dogs', ensureAuth, dogs);

app.use(errorHandler);

module.exports = app;