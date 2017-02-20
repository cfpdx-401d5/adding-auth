module.exports = function(Model) {
    return(data) => new Model(data)
        .validate() // returns an error if it doesn't pass the schema
        .then(
            // Resolve
            () => {throw new Error('validation should not have succeeded');},
            // Reject, failure handler
            // It's a sibling to the resolve and not in the `.catch` because 
            // the resolve `new Error` would otherwise kick to the `.catch`
            () => {} 
            // Catch the error and do nothing, without this it will continue 
            // to search for a failure handler and find the end mongoose failure
        );
    };