const { CONFLICT, conflict } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message = conflict) {
    super(message);
    this.statusCode = CONFLICT;
    this.message = message;
  }
}

module.exports = ConflictError;
