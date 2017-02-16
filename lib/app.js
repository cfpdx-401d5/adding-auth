const app = require('express')();
const morgan = require('morgan')('dev');
const errorHandler = require('./error-handling')();
//const users = require('./routes/user-route');
//const posts = require('./routes/posts-route');
const auth = require('./routes/auth-route');
//const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan);

app.use('/auth', auth);
//app.use('/posts', ensureAuth, users);

app.use(errorHandler);

module.exports = app;