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
});