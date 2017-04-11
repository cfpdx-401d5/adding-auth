const Post = require('../lib/models/post-schema');
const testInvalid = require('./test-invalid')(Post);

describe('post model', () => {
    it('requires a title', () => {
        return testInvalid({ body: 'Hello my test post' });
    });

    it('requires a body', () => {
        return testInvalid({ title: 'My first post' });
    });
});