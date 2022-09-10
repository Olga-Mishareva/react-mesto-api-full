const NotFoundError = require('../errors/NotFoundError');
const {
  SERVER_ERR,
  serverErr,
  pathNotFound,
} = require('./constants');

// eslint-disable-next-line no-unused-vars
module.exports.errorsHandler = (err, req, res, next) => {
  const { statusCode = SERVER_ERR, message } = err;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERR ? serverErr : message,
  });
};

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError(pathNotFound));
};
