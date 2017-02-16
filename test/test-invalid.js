module.exports = function(Model) {
    return(data) => new Model(data)
        .validate() // returns an error if it doesn't pass the schema
        .then(
            () => {throw new Error('validation should not have succeeded');},
            () => {console.log('what is going on in here');}
        )
        .catch( err => err);
};