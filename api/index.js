if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const http = require("http");
const app = require("./src/server");

const { PORT } = require("./src/config");

const server = http.createServer(app);

server.listen(PORT, () => {
  `listening on ${PORT}`;
});
