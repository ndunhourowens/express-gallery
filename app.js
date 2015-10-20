var express = require('express');
var app = express();
var gallery = require('./routes/gallery');
var router = express.Router();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./views'));

// pointer to routes/gallery.js
app.use('/gallery', gallery);

app.get('/', function(req, res){
  res.render('index', {
    title: '_ARCHITEKT'
  });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().address;
  console.log('testing');
});


module.exports = router;