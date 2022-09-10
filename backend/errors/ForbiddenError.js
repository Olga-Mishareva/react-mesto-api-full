const { FORBIDDEN, forbidden } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message = forbidden) {
    super(message);
    this.statusCode = FORBIDDEN;
    this.message = message;
  }
}

module.exports = ForbiddenError;
