const assert = require('chai').assert;
const User = require('../lib/models/user-schema');
const testInvalid = require('./test-invalid')(User);

describe('user model', () => {

    it('requires a username', () => {
        return testInvalid({ password: 'test' });
    });

    it('requires a hash via password', () => {
        return testInvalid({ name: 'myName' });
    });

    it('is valid with username and password', () => {
        return new User({ name: 'myName', password: 'test', email: 'myName@email.com' }).validate();
    });

    it('sets hash from password and correctly compares', () => {
        const data = { name: 'myName', email: 'myEmail@email.com', password: 'test' };
        const testUser = new User(data);

        console.log('user: ', testUser);

        assert.notDeepProperty(testUser, 'testUser.password');
        assert.notEqual(testUser.hash, data.password);

        assert.isTrue(testUser.comparePassword('test'));
        assert.isFalse(testUser.comparePassword('not the password'));
    });
});