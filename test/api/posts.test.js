const chai = require('chai');
const chaiHttp = require('chai-http');
const childProcess = require('child_process');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const mongoose = require('mongoose');
const User = require('../../lib/models/user-schema');

describe.skip('posts api', () => {

    before(() => mongoose.connection.dropDatabase());

    const getCmd = collection => {
        return `mongoimport --file=./test/api/${collection}.json -d shopping-test -c ${collection} --jsonArray`;
    };

    before(done => {
        childProcess.exec(getCmd('user'), err => {
            if (err) return done(err);
            childProcess.exec(getCmd('posts'), done);
        });
    });

    const request = chai.request(app);

    let userId = '';

    before(() => {
        User.find({ name: 'userOne' })
            .then(user => {
                userId = user._id;
            })
            .catch();
    });

    let authToken = '';

    before(() => {
        request
            .post('/auth/signup')
            .send({ name: 'authUser', password: 'authTest', email: 'authUser@email.com' })
            .then(res => {
                console.log("res.body:", res.body);
                authToken = res.body;
            })
            .catch();
    });


    // it('get all posts', () => {
    //     request.get('/posts')
    //         .then(res => {
    //             const posts = res.body;
    //             assert.isArray(posts);
    //             assert.lengthOf(posts, 3);
    //         });
    // });
    // let postFour = {
    //     title: 'My Fourth Post',
    //     body: 'This is my fourth posts.',
    //     author: userId
    // };

    // let postFourId = '';

    // it('create a new post', () => {
    //     request.post('/posts')
    //         .send(postFour)
    //         .then(res => {
    //             postFourId = res.body._id;
    //             assert.property(res.body, '_id');
    //         });
    // });

    // it('get post by id', () => {
    //     request.get(`/posts/${postFourId}`)
    //         .then(res => {
    //             assert.deepEqual(res.body, postFour);
    //         });
    // });

    // it('get all the posts for a certain author', () => {
    //     request.get(`/posts/author/${userId}`)
    //         .then(res => {
    //             assert.isArray(res.body);
    //             assert.length(res.body, 2);
    //         });

    // });

});