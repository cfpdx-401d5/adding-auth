const router = require('express').Router();
const Posts = require('../models/post-schema');
const bodyParser = require('body-parser').json();

module.exports = router
    .post('/', bodyParser, (req, res, next) => {
        new Posts(req.body).save()
            .then(posts => res.send(posts))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Posts.find()
            .then(posts => res.send(posts))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Posts.findById(req.params.id)
            .populate('author')
            .then(posts => res.send(posts))
            .catch(next);
    });