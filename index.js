var express = require('express');
var application = express();
var cors = require('cors');
var items = require('./data').items;
var find = require('lodash').find;

application.use(cors());
application.get('/', function(req, res) {
  res.json(items);
});
application.get('/posts/:id', function(req, res) {
  var id = req.params.id;
  var item = find(items, function(item) { return item.id == id; });
  res.json(item);
});
application.listen(3001, function() {
  console.log('Server on 3001');
});
