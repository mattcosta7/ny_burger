const db = require('../db');
const repl = require('repl');

const replServer = repl.start({
  prompt: 'my-app > ',
});

replServer.context.db = db;
