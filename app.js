var express = require('express');
var app = express();
var path = require('path');
var db = require('./models');
var Photo = db.Photo;
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
app.get('/index', function (req, res) {
  Photo.findAll()
    .then(function (photos){
      res.render('image', {
        photos: photos,
        mainImage: photos.shift()
    });
  });
});


// GalleryID route
app.get('/gallery', function (req, res, next){
  Photo.findAll()
    .then(function (photos){
      res.render('gallery', {
        photos: photos,
        mainImage: photos.shift()
    });
  });
});

app.get('/gallery/new', function (req, res, next){
  res.render('new', {
    work: 'hey work'
  });
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
      // res.render('new', {
      //   users: users,
      //   mainImage: 'test this shit out'
      // });
    });
});

app.get('/gallery/signIn', function (req, res, next){
  res.render('signIn', {
    wtf: 'will you work now?'
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