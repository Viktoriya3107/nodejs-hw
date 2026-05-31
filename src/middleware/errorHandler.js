import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  const isHttpError = createHttpError.isHttpError(err);

  const status = isHttpError ? err.status : 500;
  const message = isHttpError ? err.message : 'Server error';

  res.status(status).json({
    message,
  });
};
