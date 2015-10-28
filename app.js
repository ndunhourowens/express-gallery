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

var photoTag = {
  image: 'some picture',
  desc: 'blah blah'
};

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
    title: 'gallery-detail',
    photo: photoTag
  });
});


/*------------------
    CREATING DATA
-------------------*/

app.post('/users', function (req, res) {
  User.create({ username: req.body.username })
    .then(function (user) {
      res.json(user);
    });
});
app.get('/users', function(req, res) {
  User.findAll()
    .then(function (users) {
      res.json(users);
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
