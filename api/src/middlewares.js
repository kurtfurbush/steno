const logError =  require('../util/logError.js');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found');
  logError(error, req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  logError(err);
  res.status(statusCode);
  res.json({
    message: err.message,
  });
}

module.exports = {
  notFound,
  errorHandler
};