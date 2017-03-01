const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const app = require('../../lib/app');
const request = chai.request(app);

describe('auth', () => {

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

        it('signup requires password', () => {
            badRequest('/auth/signup', { name: 'myName', email: 'myName@email.com' }, 'username, password, and email must be supplied');
        });

        it('signup requires email', () => {
            badRequest('/auth/signup', { name: 'myName', password: 'test' }, 'username, password, and email must be supplied');
        });

        it('signup', () => {
            request
                .post('/auth/signup')
                .send(user)
                .then(res => {
                    assert.ok(res.body.token);
                });
        });

        it('unique username', () => {
            badRequest('/auth/signup', user, 'username already exists');
        });

        it('signin requires username', () => {
            badRequest('/auth/signin', { password: 'test' }, 'username, password, and email must be supplied');
        });

        it('signin requires password', () => {
            badRequest('/auth/signin', { name: 'myName' }, 'username, password, and email must be supplied');
        });

        it('signin with wrong user', () => {
            badRequest('/auth/signin', { name: 'yourName', password: 'testYour' }, 'username, password, and email must be supplied');
        });

        it('signin with wrong password', () => {
            badRequest('/auth/signin', ({ name: 'hisName', password: 'bad' }), 'username, password, and email must be supplied');
        });

        let token = '';

        it('signin', () => {
            request
                .post('/auth/signin')
                .send(user)
                .then(res => {
                    token = res.body.token;
                    assert.ok(res.body.token);
                });
        });

        it('token is invalid', () => {
            request
                .get('/auth/verify')
                .set('Authorization', 'bad token')
                .then(
                    () => { throw new Error('success response not expected'); },
                    res => {
                        assert.equal(res.status, 401);
                    }
                );
        });

        it('token is valid', () => {
            request
                .get('/auth/verify')
                .set('Authorization', token)
                .then(res => assert.ok(res.body));
        });
    });

    describe('unautorized', () => {
        it('401 with no token', () => {
            return request
                .get('/posts')
                .then(
                    () => { throw new Error('status should not be 200'); },
                    res => {
                        assert.equal(res.status, 401);
                        assert.equal(res.response.body.error, 'Unauthorized');
                    }
                );
        });
    });
});