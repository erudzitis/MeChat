const { StatusCodes } = require("http-status-codes");

const errorHandler = (error, req, res, next) => {
    const customErrorData = {
        status: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Something went wrong, try again later!"
    };

    return res.status(customErrorData.status).json({
        success: false,
        message: customErrorData.message
    });
};

module.exports = errorHandler;