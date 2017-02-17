const errorHandler = require('../lib/error-handling')();
const assert = require('chai').assert;

describe.skip('error handler', () => {

    it('returns 500 when no code provided', () => {
        const err = new Error('some server error');
        const res = {
            status(code) { this.code = code; return this; },
            send(error) { this.error = error; }
        };

        errorHandler(err, null, res, null);
        assert.equal(res.code, 500);
        assert.deepEqual(res.error.error, 'Internal Server Error');
    });

});