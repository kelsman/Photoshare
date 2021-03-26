const ErrorHanlder = require('../utils/errorHandler');

module.exports = (req, res, err, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server error';

    res.status(err.statusCode).json({
        sucess: false,
        error: err
    });


}