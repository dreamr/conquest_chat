exports.index = function(req, res){
  res.render('index', { title: 'Conquest Chat' })
};

exports.viewport = function(req, res){
  res.render('viewport', { title: 'Conquest' })
};
