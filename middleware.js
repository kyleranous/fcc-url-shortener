// Middleware Definitions
// Dependencies

const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
};

module.exports.requestLogger = requestLogger;