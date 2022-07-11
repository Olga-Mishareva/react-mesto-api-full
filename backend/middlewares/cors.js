const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const { requestHeaders } = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.headers('Access-Control-Allow-Origin', origin);
    console.log(origin);
  }
  if (method === 'OPTIONS') {
    res.headers('Access-Control-Allow-Origin', origin);
    res.headers('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.headers('Access-Control-Allow-Headers', requestHeaders);

    console.log(method);
    res.end();
    return;
  }

  next();
};

// module.exports = (req, res) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const { requestHeaders } = req.headers['access-control-request-headers'];
//   console.log(origin);
//   console.log(method);
//   let corsOptions;

//   if (allowedCors.includes(origin)) {
//     corsOptions = { origin: true };
//   }
//   if (method === 'OPTIONS') {
//     corsOptions.methods = DEFAULT_ALLOWED_METHODS;
//     corsOptions.allowedHeaders = requestHeaders;
//   }
//   return corsOptions;
// };
