const { UNAUTHORIZED, unauthorized } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message = unauthorized) {
    super(message);
    this.statusCode = UNAUTHORIZED;
    this.message = message;
  }
}

module.exports = UnauthorizedError;
