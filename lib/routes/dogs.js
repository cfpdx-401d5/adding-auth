const router = require('express').Router();
const Dog = require('../models/dogs');
const bodyParser = require('body-parser').json();

module.exports = router
    .post('/', bodyParser, (req, res, next) => {
        new Dog(req.body).save()
            .then(dog => res.send(dog))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Dog.find()
            .then(dogs => res.send(dogs))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Dog.findById(req.params.id)
            .then(dog => {
                if(!dog) {
                    res.status(404).send('Cannot find ID');
                } else {
                    res.send(dog);
                }
            });
    });

module.exports = router;
    