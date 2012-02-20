/**
 * Module dependencies.
 */
var express   = require('express')
  , routes    = require('./routes')
  , app       = module.exports = express.createServer()
  , io        = require('socket.io').listen(app)
  , stylus    = require('stylus')
  , chat      = require('chat').socketCalls(io)


// For compiling stylus
function compileMethod(str) {
  return stylus(str)
    .set('compress', true);
};
  
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

// Routes
app.get('/',          routes.index);
app.get('/viewport',  routes.viewport);

// Startup
app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
