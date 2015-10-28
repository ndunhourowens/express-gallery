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
    DATA
------------*/

var photoTag = [];

/*-----------
    ROUTES
------------*/

// Index route
app.get('/', function(req, res, next){
  res.render('index', {
    title: '_ARCHITEKT',
    info: 'Welcome to out online portfolio, we are small group of passionate designers and architects, looking to change and create amazing digital images to inspire others to follow in our innovative steps.  Free Architect WordPress Theme',
    footer: 'Copyright www.fantasticnorway.no'
  });
});

// Gallery route
app.get('/gallery-detail', function(req, res, next){
  res.render('gallery-detail', {
    // title: photoTag[8].title,
    // url: photoTag[8].url,
    // description: photoTag[8].description
  });
});


/*------------------
    CREATING DATA
-------------------*/

app.post('/users', function (req, res) {
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
app.get('/users', function(req, res) {
  User.findAll()
    .then(function (users) {
      // res.json(users);
      // var photos = res.json(users);
      console.log(users[9]);
      photoTag.push(users);
      res.render('image', {
        users: users
      });

    });
});
console.log('photoTag', photoTag);

// server function
startServer();

function startServer(){
  var server = app.listen(3000, function(){
    var port = server.address().port;
    db.sequelize.sync();
    console.log('Listening on port' + port);

  });
}