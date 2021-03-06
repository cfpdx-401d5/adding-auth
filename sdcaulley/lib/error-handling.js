module.exports = function getErrorHandler() {

    return function errorHandler(err, req, res, next) { // eslint-disable-line

        let code = 500,
            error = 'Internal Server Error';

        // Mongoose Validation Error?
        if (err.name === 'ValidationError' || err.name === 'CastError') {
            code = 400;
            error = err.errors;
        }
        // is this one of our errors?
        else if (err.code) {
            code = err.code;
            error = err.error;
            console.log(err.code, err.error);
        }
        // or something unexpected?
        else {
            console.log(err);
        }

        res.status(code).send({ error });
    };
};