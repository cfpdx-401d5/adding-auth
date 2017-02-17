const chai = require('chai');
const chaiHttp = require('chai-http');
const childProcess = require('child_process');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const mongoose = require('mongoose');

describe('posts api', () => {
    before(() => mongoose.connection.dropDatabase());

    const getCmd = collection => {
        return `mongoimport --file=./test/api${collection}.json -d shopping-test -c ${collection} --jsonArray`;
    };

    before(done => {
        childProcess.exec(getCmd('posts'), err => {
            if (err) return done(err);
        });
    });

    const request = chai.request(app);


});