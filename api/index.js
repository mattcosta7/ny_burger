if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const http = require('http');
const app = require('./src/server');

const { SERVER_PORT } = require('./src/config');

const server = http.createServer(app);

server.listen(SERVER_PORT, () => {
  `listening on ${SERVER_PORT}`;
});
