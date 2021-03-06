module.exports.CREATED = 201;

module.exports.emailRegex = /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/;
module.exports.linkRegex = /^https?:\/\/(www\.)?([\w\-\\.]+)\.([a-z]{2,})([\w\\.\-\\~:\\/\\?#\\[\]@!\\$&'\\(\\)\\*\\+\\,;\\=]*)#?$/;

module.exports.allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://mesto.om.nomoredomains.xyz',
];
