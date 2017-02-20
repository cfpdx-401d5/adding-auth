const User = require('../lib/models/user');
const assert = require('chai').assert;

describe('user model', () => {
    it('sets hash from password and correctly compares', () => {
        const signupData = {username: 'user1', password: 'pwd'};
        const user = new User(signupData);
        
        assert.isUndefined(user.password);
        assert.notEqual(user.hash, signupData.password);
        assert.isTrue(user.comparePassword('pwd'));
        assert.isFalse(user.comparePassword('123'));
    });

});