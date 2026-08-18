"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`[Error Handler] ${statusCode} - ${message}`, err.stack);
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        ...(err.details ? { details: err.details } : {}),
        ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        status: 'fail',
        statusCode: 404,
        message: `Cannot find route ${req.method} ${req.originalUrl} on this server`,
    });
};
exports.notFoundHandler = notFoundHandler;
