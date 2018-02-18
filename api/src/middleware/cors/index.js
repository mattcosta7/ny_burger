const cors = require('cors');

const apiWhitelist = ['https://localhost:3001', 'https://localhost:3000'];

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
