var express = require('express');
var app = express();
var router = express.Router();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./views'));

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().address;
});

// GET/ ==> view list of gallery photos

// GET/gallery/:id ==> see single gallery photo
  // photo include a link to delete photo
  // photo link to edit photo

// GET/gallery/new ==> form
  // fields:
    // author: Text
    // link: Text(imgage URL)
    // description: TextArea

// POST/gallery ==> new gallery photo

// GET/gallery/:id/edit ==> edit form identified by :id
  // fields:
    //author: Text
    // link: Text(image URL)
    // description: TextArea

// PUT/gallery/:id ==> updates single photo

// DELETE/gallery/:id ==> delete single photo

module.exports = router;