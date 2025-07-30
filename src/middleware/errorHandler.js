function errorHandler(err, req, resk, next) {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;
