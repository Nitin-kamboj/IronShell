export function errorHandler(err, req, res, next) {
    console.error("SERVER_ERROR: " + err.message);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || "Internal Server Error",
            status: statusCode
        }
    });
}