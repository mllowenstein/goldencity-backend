
/**
 * Global error handling middleware
 * Catches and formats all errors in a consistent way
 */
const errorMiddleware = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    error.statusCode = err.statusCode || 500;
  
    // Log error for debugging (in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Stack:', err.stack);
    }
  
    // Mongoose bad ObjectId (CastError)
    if (err.name === 'CastError') {
      const message = 'Resource not found';
      error.statusCode = 404;
      error.message = message;
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      error.statusCode = 400;
      error.message = message;
    }
  
    // Mongoose duplicate key error
    if (err.code === 11000) {
      const message = 'Duplicate field value entered';
      error.statusCode = 400;
      error.message = message;
    }
  
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      const message = 'Invalid token';
      error.statusCode = 401;
      error.message = message;
    }
  
    if (err.name === 'TokenExpiredError') {
      const message = 'Token expired';
      error.statusCode = 401;
      error.message = message;
    }
  
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
      }),
    });
  };
  
  export default errorMiddleware;