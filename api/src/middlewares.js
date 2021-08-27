import logError from '../util/logError.js';

export function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found');
  logError(error, req.originalUrl);
  next(error);
}

/* eslint-disable no-unused-vars */
export function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  logError(err);
  res.status(statusCode);
  res.json({
    message: err.message,
  });
}
