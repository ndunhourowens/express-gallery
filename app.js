var express = require('express');
var path = require('path');
var app = express();
// where the root (server) is located.
app.use(express.static(path.join(__dirname, '/')));

// Path to Jade views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

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

// server function
startServer();

function startServer(){
  var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port' + port);

  });
}
