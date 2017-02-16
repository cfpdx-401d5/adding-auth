const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const mongoose = require('mongoose');
const app = require('../../lib/app');
const request = chai.request(app);

describe('auth', () => {
    before(() => mongoose.connection.dropDatabase());

    const user = {
        name: 'myName',
        password: 'test',
        email: 'myName@email.com'
    };
    describe('user management', () => {
        const badRequest = (url, data, error) => {
            request
                .post(url)
                .send(data)
                .then(
                    () => { throw new Error('status should not be ok.'); },
                    res => {
                        assert.equal(res.status, 400);
                        assert.equal(res.response.body.error, error);
                    }
                );
        };

        it('signup requires username', () => {
            badRequest('/auth/signup', { password: 'test', email: 'myName@email.com' }, 'username, password, and email must be supplied');
        });
    });

});