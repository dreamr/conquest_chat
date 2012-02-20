exports.index = function(req, res){
  res.render('index', { title: 'Conquest' })
};

exports.viewport = function(req, res){
  res.render('viewport', { title: 'Conquest' })
};

exports.chat = function(req, res){
  res.render('chat', { title: 'Conquest Chat' })
};
