const app = require('express')();
const morgan = require('morgan')('dev');
const songs = require('./routes/songs');
const auth = require('./routes/auth');
const errorHandler = require('./error-handler')();

app.use(morgan);

app.use('/auth', auth);
app.use('/songs', songs);

// this needs to be at the bottom
app.use(errorHandler);

module.exports = app;