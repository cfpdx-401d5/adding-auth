/* 
 * get the packages for the application
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

//const connection = require('./lib/connection');
const http = require('http');

// I confess. I'm in a hurry to complete assignment
const jwt = require('jsonwebtoken');
const config = require('./config'); // db info
const User = require('./lib/models/user');

// configuration stuff that belongs elsewhere later
const port = process.env.PORT || 8080; // for handling tokens

mongoose.connect(config.database); // get tool database
app.set('superSecret', config.secret); // hiding access to db

// body parser to get to post and url params
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// morgan is here. don't forget to look at it
app.use(morgan('dev'));


// routes
// basic route
app.get('/', function(req, res) {
    res.send('Hello. The API is here');
});
// =====================================
// API routes
//======================================
// get an instance of the route for api routes
var apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
    //find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            //check if password matches 
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 1440
                });
                //return the information including token as json 
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }

    });
});
// TODO: route middleware to verify a token
apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp 
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes 
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token 
        // return an error 
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =====================================
// start the server
//======================================

//app.listen(port);
//console.log('Setting port ', port);
const server = http.createServer(app);
server.listen(3080, () => {
    console.log('server is listening: ', server.address());
});