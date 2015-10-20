var express = require('express');
var app = express();
var router = express.Router();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./views'));

// pointer to routes/gallery.js
app.use('/gallery', gallery);



var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().address;
});


module.exports = router;