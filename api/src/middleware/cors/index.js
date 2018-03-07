const cors = require('cors');

const apiWhitelist = [
  'https://localhost:3001',
  'https://localhost:4000',
  'http://localhost:3001',
  'http://localhost:4000',
  'http://159.65.189.97',
  'https://159.65.189.97',
  'http://newyorkburgerblog.com',
  'https://newyorkburgerblog.com',
  'http://nyburgerblog.com',
  'https://nyburgerblog.com',
];

const apiOpts = {
  origin: (origin, callback) => {
    if (!origin || apiWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = {
  apiOpts,
};
