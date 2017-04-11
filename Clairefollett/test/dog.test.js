const Dog = require('../lib/models/dogs');
const testInvalid = require('./test-invalid')(Dog);

describe('dog model', () => {
    
    it('requires name', () => {
        return testInvalid({ group: 'group' });
    });

    it('requires group', () => {
        return testInvalid({ name: 'name' });
    });

    it('is valid w name and group', () => {
        return new Dog({ name: 'name', group: 'group' }).validate();
    });
});