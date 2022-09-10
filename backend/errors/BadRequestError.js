const { BAD_REQ, badRequest } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message = badRequest) {
    super(message);
    this.statusCode = BAD_REQ;
    this.message = message;
  }
}

module.exports = BadRequestError;
