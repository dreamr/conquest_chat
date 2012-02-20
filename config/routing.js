var routes    = require('../routes');

exports.routing = function(app) {
  app.get('/',          routes.index    );
  app.get('/chat',      routes.chat     );
  app.get('/viewport',  routes.viewport );
};
