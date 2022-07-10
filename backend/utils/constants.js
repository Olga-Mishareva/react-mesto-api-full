module.exports.CREATED = 201;

module.exports.emailRegex = /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/;
module.exports.linkRegex = /^https?:\/\/(www\.)?([\w\-\\.]+)\.([a-z]{2,})([\w\\.\-\\~:\\/\\?#\\[\]@!\\$&'\\(\\)\\*\\+\\,;\\=]*)#?$/;

module.exports.allowedCors = [
  'http://localhost:3001',
  'mesto.om.nomoredomains.xyz',
];

module.exports.DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
