// test the user creation
const User = require('../lib/models/user');
const testInvalid = require('./test-invalid')(User);
const assert = require('chai').assert;

describe('user model and creation', () => {

    it('requires a username', () => {
        return testInvalid({ password: 'abc' });
    });

    it('requires a hash via password', () => {
        return testInvalid({ username: 'username' });
    });

    it('is valid with username and password', () => {
        return new User({
                username: 'usernamed',
                password: 'passworded'
            })
            .validate();
    });

    it('sets hash from password and correctly compares', () => {
        const data = {
            username: 'usernamed',
            password: 'passworded'
        };

        const user = new User(data);

        assert.isUndefined(user.password);
        assert.notEqual(user.hash, data.password);
        assert.isTrue(user.comparePassword('passworded'));
        assert.isFalse(user.comparePassword('not the password'));

    });

    it('checks for token ', () => {
        const data = {
            username: 'usernamed',
            password: 'passworded'
        };
        const user = new User(data);
        if (user) {
            console.log('username ', user.username);
        }
    });

}); // end describe