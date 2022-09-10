module.exports.CREATED = 201;
module.exports.BAD_REQ = 400;
module.exports.UNAUTHORIZED = 401;
module.exports.FORBIDDEN = 403;
module.exports.NOT_FOUND = 404;
module.exports.CONFLICT = 409;
module.exports.SERVER_ERR = 500;

module.exports.badRequest = 'Invalid data';
module.exports.unauthorized = 'Authorisation is required';
module.exports.forbidden = 'No rights for this action';
module.exports.notFound = 'Data not found';
module.exports.conflict = 'This email already exists';
module.exports.serverErr = 'No rights for this action';
module.exports.pathNotFound = 'Path not found';
module.exports.serverErr = 'Server error';
module.exports.badUserData = 'Invalid email or password';

module.exports.emailRegex = /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/;
module.exports.linkRegex = /^https?:\/\/(www\.)?([\w\-\\.]+)\.([a-z]{2,})([\w\\.\-\\~:\\/\\?#\\[\]@!\\$&'\\(\\)\\*\\+\\,;\\=]*)#?$/;

module.exports.allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://mesto.om.nomoredomains.xyz',
];
