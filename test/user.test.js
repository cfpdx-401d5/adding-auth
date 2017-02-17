const User = require('../lib/models/user');
const testInvalid = require('./test-invalid')(User);
const assert = require('chai').assert;

describe('user model', () => {
    
    it('requires username', () => {
        return testInvalid({ password: 'hi' });
    });

    it('requires a hash for password', () => {
        return testInvalid({ username: 'username' });
    });

    it('is valid w username and password', () => {
        return new User({ username: 'username', password: 'hi'}).validate();
    });

    it('uses hash for password correctly and compares', () => {
        const data = { username: 'username', password: 'hi'};
        const user = new User(data);

        assert.isUndefined(user.password);
        assert.notEqual(user.hash, data.password);

        assert.isTrue(user.comparePassword('hi'));
        assert.isFalse(user.comparePassword('incorrect password'));
    });

});