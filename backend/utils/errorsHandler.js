const NotFoundError = require('../errors/NotFoundError');

// eslint-disable-next-line no-unused-vars
module.exports.errorsHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
};

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError('Путь не найден.'));
};
