module.exports = function getErrorHandler() {

    return function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars

        let code = 500, error = 'Internal Server Error';

        if(err.name === 'ValidationError' || err.name == 'CastError') {
            code = 400;
            error = err.errors.name.message;
        }

        else if(err.code) {
            code = err.code;
            error = err.error;
            console.log(err.code, err.error);
        }

        else {
            console.log(err);
        }

        res.status(code).send({ error });
    };
};