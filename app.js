var express = require('express');
var app = express();
var path = require('path');
var db = require('./models');
var User = db.User;
// where the root (server) is located.
app.use(express.static(path.join(__dirname, '/')));

// Path to Jade views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/*-------------
  BODY PARSER
--------------*/

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));


/*-----------
    ROUTES
------------*/
// index page
app.get('/index', function(req, res) {
  User.findAll()
    .then(function (users){
      res.render('image', {
        users: users,
        mainImage: users.shift()
    });
  });
});


// GalleryID route
app.get('/galleryID', function(req, res, next){
  User.findAll()
    .then(function (users){
      res.render('galleryID', {
        users: users,
        mainImage: users.shift()
    });
  });
});

app.post('/new', function (req, res) {
  User.create({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
    author: req.body.author
  })
    .then(function (user) {
      res.json(user);
    });
});


// server function
startServer();

function startServer(){
  var server = app.listen(3000, function(){
    var port = server.address().port;
    db.sequelize.sync();
    console.log('Listening on port' + port);

  });
}