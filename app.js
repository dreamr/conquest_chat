/**
 * Module dependencies.
 */
var express   = require('express')
  , app       = module.exports = express.createServer()
  , io        = require('socket.io').listen(app)
  , config    = require('./config/config.js').configuration(app);

require('./lib/chat').socketCalls(io);

require('./config/express.js').configure(app)
require('./config/routing.js').routing(app)

// Startup
app.listen( config['http_port'] );
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
