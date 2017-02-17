const router = require('express').Router();
const Song = require('../models/song');
const bodyParser = require('body-parser').json();

router.get('/', (req, res, next) => {
    Song.find()
        .then(songs => res.send(songs))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    Song.findById(req.params.id)
        .then(song => res.send(song))
        .catch(next);
});

router.post('/', bodyParser, (req, res, next) => {
    new Song(req.body).save()
        .then(newSong => res.send(newSong))
        .catch(next);
});

module.exports = router;