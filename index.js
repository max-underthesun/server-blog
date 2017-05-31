var express = require('express');
var application = express();
var cors = require('cors');
var items = require('./data').items;
var about = require('./data').about;
var find = require('lodash').find;

var findItem = function(id) {
  var item = find(items, function(item) { return item.id == id; });
  return item;
};

application.use(cors());
application.get('/', function(req, res) {
  setTimeout(
    function() {
      return  res.json(items);
    },
    1000
  );

  // res.json(items);
  // res.status(500).send('something blew up');
});
application.get('/posts/:id', function(req, res) {
  setTimeout(
    function() {
      var id = req.query.id;
      return res.json(findItem(id));
    },
    1000
  );
  // var id = req.params.id;

  // var id = req.query.id;
  // res.json(findItem(id));
});
application.get('/about', function(req, res) {
  res.json(about);
});


application.post('/posts/:id/like', function(req, res) {
  var id = req.params.id;
  var item = findItem(id);
  var count = ++item.meta.count;

  res.json({ id, count });
});

application.listen(3001, function() {
  console.log('Server on 3001');
});
