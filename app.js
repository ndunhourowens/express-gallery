var express = require('express');
var app = express();
var router = express.Router();
var gallery = require('./routes/gallery');
var index = require('./routes/index');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(express.static('./public'));

// pointer to routes/index.js
app.use('/index', index);
// pointer to routes/gallery.js
app.use('/gallery', gallery);


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().address;
  console.log('testing');
});


module.exports = router;