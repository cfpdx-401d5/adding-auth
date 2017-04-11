const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user-schema');
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-auth')();

function hasCredentials(req, res, next) {
    const user = req.body;
    if (!user.name || !user.password || !user.email) {
        return next({
            code: 400,
            error: 'username, password, and email must be supplied'
        });
    }
    next();
}

router
    .get('/verify', ensureAuth, (req, res) => {
        res.send({ valid: true });
    })
    .post('/signup', bodyParser, hasCredentials, (req, res, next) => {
        const data = req.body;
        delete req.body;

        User.findOne({ name: data.name })
            .then(user => {
                if (user) throw {
                    code: 400,
                    error: 'username already exists'
                };
                return new User(data).save();
            })
            .then(user => {
                token.sign(user);
            })
            .then(token => res.send({ token }))
            .catch(next);
    })
    .post('/signin', bodyParser, hasCredentials, (req, res, next) => {
        const data = req.body;
        delete req.body;

        User.findOne({ name: data.name })
            .then(user => {
                if (!user || !user.comparePassword(data.password)) {
                    throw {
                        code: 400,
                        error: 'invalid user or password'
                    };
                }
                return user;
            })
            .then(user => token.sign(user))
            .then(token => res.send({ token }))
            .catch(next);
    });

module.exports = router;