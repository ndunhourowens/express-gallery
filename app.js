var express = require('express');
var app = express();
var path = require('path');
var db = require('./models');
var Photo = db.Photo;
var User = db.User;
var methodOverride = require('method-override')

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

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

/*-----------
    ROUTES
------------*/
// index page
app.get('/', function (req, res) {
  Photo.findAll()
    .then(function (photos){
      res.render('home', {
        photos: photos,
        mainPhoto: photos.shift()
    });
  });
});


// GalleryID route
app.get('/gallery', function (req, res, next){
  Photo.findAll()
    .then(function (photos){
      res.render('gallery', {
        photos: photos,
        mainPhoto: photos.shift()
    });
  });
});

app.get('/gallery/new', function (req, res, next){
  res.render('new');
});

app.post('/gallery/new', function (req, res) {
  Photo.create({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
    author: req.body.author
  })
    .then(function (photo) {
      res.redirect('/gallery');
    });
});

app.get('/gallery/signIn', function (req, res, next){
  res.render('signIn');
});

app.post('/gallery/signIn', function (req, res, next){
  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(function (user) {
      res.redirect('/gallery');
    });
});

app.get('/gallery/:id', function (req, res, next){
  // res.send('gallery/' + req.params.id);
  Photo.findOne({ where: { id: req.params.id }})
    .then(function (post) {
      res.render('singlePhoto', {photo: post.dataValues});
    });
});

app.get('/gallery/edit/:id', function (req, res, next){
  Photo.findOne({ where: { id: req.params.id }})
    .then(function (post) {
      res.render('singlePhotoEdit', {photo: post.dataValues});
    });
});

app.put('/gallery/edit/:id', function (res, req, next){
   //- find out a way to find by id
    //- .then method (similar to index code)

   Photo.update({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
    author: req.body.author
  })
    .then(function (photo) {
      res.redirect('/gallery/edit/:id');
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