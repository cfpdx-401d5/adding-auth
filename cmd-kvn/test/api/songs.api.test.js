const chai = require('chai');
const chaiHttp = require('chai-http');
const childProcess = require('child_process');
const mongoose = require('mongoose'); 

const app = require('../../lib/app');

// connect to mongo
process.env.DB_URI = 'mongodb://localhost:27017/auth-lab-test';
require('../../lib/connection');

const assert = chai.assert;

chai.use(chaiHttp);

describe('song API', () => {
    const request = chai.request(app);
    const testSong = {
        title: 'Despacito',
        artist: 'Luis Fonsi',
        featuring: 'Daddy Yankee',
        rating: 5
    };
    const exportData = collection => {
        return `mongoimport --file=./test/api/${collection}.json -d auth-lab-test -c ${collection} --jsonArray`;
    };

    let bailandoId = null;

    before(() => mongoose.connection.dropDatabase());

    before(done => {
        childProcess.exec(exportData('songs'), err => {
            if (err) return done(err);
            done();
        });
    });

    it('GETs all the songs', () => {
        return request.get('/songs')
            .then(res => {
                bailandoId = res.body[1]._id; // used for GET/:id
                assert.equal(res.body.length, 3); // 3 is the number of songs in songs.json
            });
    });

    it('GETs one song by :id', () => {
        return request.get(`/songs/${bailandoId}`)
        .then(res => {
            assert.equal(res.body.artist, 'Enrique Iglesias');
            assert.equal(res.body.title, 'Bailando');
        });
    });

    it('POSTs a new song', () => {
        return request.post('/songs')
        .send(testSong)
        .then(res => {
            assert.equal(res.body.title, testSong.title);
            assert.equal(res.body.artist, testSong.artist);
        });
    });

});