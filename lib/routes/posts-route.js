const router = require('express').Router();
const Post = require('../models/post-schema');
const bodyParser = require('body-parser').json();

module.exports = router
    .post('/', bodyParser, (req, res, next) => {
        new Post(req.body).save()
            .then(posts => res.send(posts))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Post.find()
            .then(posts => res.send(posts))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Post.findById(req.params.id)
            .populate('author')
            .then(posts => res.send(posts))
            .catch(next);
    });