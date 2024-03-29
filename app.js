/**
 * Module dependencies.
 */
var express   = require('express')
  , app       = module.exports = express.createServer()
  , io        = require('socket.io').listen(app)
  , config    = require('./config/config.js').configuration(app);

require('./lib/chat').socketCalls(io);
require('./config/routing.js').routing(app)

// Express Config
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret_key' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Startup
app.listen( config['http_port'] );
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
