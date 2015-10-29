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
// app.get('/', function(req, res, next){
//   res.render('index', {
//     title: '_ARCHITEKT',
//     info: 'Welcome to out online portfolio, we are small group of passionate designers and architects, looking to change and create amazing digital images to inspire others to follow in our innovative steps.  Free Architect WordPress Theme',
//     footer: 'Copyright www.fantasticnorway.no'
//   });
// });

// Gallery route
app.get('/gallery:id', function(req, res, next){
  res.render('gallery:id', {

  });
});


/*------------------
    CREATING DATA
-------------------*/

app.post('/gallery', function (req, res) {
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
app.get('/index', function(req, res) {
  User.findAll()
    .then(function (users){
      res.render('image', {
        users: users,
        mainImage: users.shift()
    });
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