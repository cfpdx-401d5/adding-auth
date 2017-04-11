const router = require('express').Router();
const bodyParser = require('body-parser').json();

const User = require('../models/user');
const token = require('../../auth/token');
const ensureAuth = require('../../auth/ensure-auth')();

function hasUsernameAndPassword(req, res, next) {
    const user = req.body;
    if (!user.username || !user.password) {
        return next({
            code: 400,
            error: 'username and password must be provided'
        });
    }
    next();
}

router.get('/verify', ensureAuth, (req, res) => {
    res.send({ valid: true });
});

router.post('/signup', bodyParser, hasUsernameAndPassword, (req, res, next) => {
    const data = req.body;
    delete req.body;

    User.find({ username: data.username }).count()
        .then(count => {
            if (count > 0) throw {
                code: 400,
                error: `username ${data.username} has already been taken`
            };
            return new User(data).save();
        })
        .then(user => token.sign(user))
        .then(token => res.send({ token }))
        .catch(next);
});

module.exports = router;
