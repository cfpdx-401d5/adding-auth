const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../../lib/app');

const assert = chai.assert;

// connect to mongo
process.env.DB_URI = 'mongodb://localhost:27017/auth-lab-test';
require('../../lib/connection');

chai.use(chaiHttp);

describe.only('auth API', () => {

    const request = chai.request(app);
    const testUser = { username: 'testUser', password: 'asdf' };

    before(() => mongoose.connection.dropDatabase());

    describe('user management', () => {

        const badRequest = (url, data, error) => {
            request
                .post(url)
                .send(data)
                .then(
                () => { throw new Error('status should not be okay'); },
                res => {
                    // console.log('look for res.status', res.response);
                    assert.equal(res.status, 400);
                    assert.equal(res.response.body.error, error);
                });
        };

        it('signup requires a username', () => 
            badRequest('/auth/signup', {password: 'justPassword'}, 'username and password are required')
        );

    });

});