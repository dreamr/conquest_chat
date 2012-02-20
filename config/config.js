exports.configuration = function(app) {
  var env = app.settings.env
  return {
    'http_port':      envHttpPort(env)
  , 'socket_port':    envSocketPort(env)
  };
}

function envHttpPort(env) {
  if (env == 'development') {
    return 3000
  } else {
    return 80
  }
}

function envSocketPort(env) {
  if (env == 'development') {
    return 3001
  } else {
    return 81
  }
}