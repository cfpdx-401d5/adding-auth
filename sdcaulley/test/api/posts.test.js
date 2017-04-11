const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const User = require('../../lib/models/user-schema');
const request = chai.request(app);
const Token = require('../../lib/auth/token');
const Post = require('../../lib/models/post-schema');

describe('posts api', () => {

    let userId = '';
    let authToken = '';

    before(() => {

        return User.findOne({ name: 'myName' })
            .then(user => {
                userId = user._id;
                return Token.sign(user._id);
            })
            .then(data => {
                return authToken = data;
            });
    });

    it('get all posts', () => {
        request.get('/posts')
            .set('Authorization', authToken)
            .then(res => {
                const posts = res.body;
                assert.isArray(posts);
                assert.lengthOf(posts, 0);
            });
    });
    let postFour = {
        title: 'My Fourth Post',
        body: 'This is my fourth posts.',
    };

    it('create a new post', () => {
        postFour.author = userId;

        request.post('/posts')
            .set('Authorization', authToken)
            .send(postFour)
            .then(res => {
                assert.property(res.body, '_id');
            });
    });

    it('get post by id', () => {
        return Post.findOne({ title: 'My Fourth Post' })
            .then(post => {
                request.get(`/posts/${post._id}`)
                    .set('Authorization', authToken)
                    .then(res => {
                        assert.deepEqual(res.body, postFour);
                    });
            });
    });
});