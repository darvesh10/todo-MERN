 const notFound = (req,res,next) => {
   const error = new Error(`NOT FOUND ${req.originalUrl}`)
  error.statusCode = 404;
  next(error);
}

 const errorHandler = (error,req,res,next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
}

module.exports = {notFound,errorHandler};