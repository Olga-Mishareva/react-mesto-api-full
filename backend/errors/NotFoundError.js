const { NOT_FOUND, notFound } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message = notFound) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.message = message;
  }
}

module.exports = NotFoundError;
