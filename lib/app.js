const app = require('express')();
const morgan = require('morgan')('dev');
const songs = require('./routes/songs');

app.use(morgan);
app.use('/songs', songs);

module.exports = app;