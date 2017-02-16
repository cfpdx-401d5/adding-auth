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

    it('sets hash from password and correctly compares', () => {
        const data = { name: 'myName', email: 'myEmail@email.com', password: 'test' };
        const user = new User(data);

        assert.isUndefined(user.password);
        assert.notEqual(user.hash, data.password);

        assert.isTrue(user.comparePassword('test'));
        assert.isFalse(user.comparePassword('not the password'));
    });
});