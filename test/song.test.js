const Song = require('../lib/models/song');
const testInvalid = require('./test-invalid')(Song);

describe('Song model', () => {

    it('Requires a title', () => {
        // artist and title are required
        // providing just one will not meet requirements
        return testInvalid({ artist: 'joe'});
    });

    it('Requires an artist', () => {
        return testInvalid({ title: 'twinkle twinkle'});
    });

    it('is valid with the required title and artist', () => {
        return new Song({title: 'abc', artist: '123'}).validate();
    });

});