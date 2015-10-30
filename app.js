var express = require('express');
var app = express();
var path = require('path');
var db = require('./models');
var Photo = db.Photo;
var User = db.User;
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
var session = require('express-session');



// where the root (server) is located.
app.use(express.static(path.join(__dirname, '/')));

// Path to Jade views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* --------------------
  Setting for passport
----------------------*/

app.use(session(
{
  secret: 'keyboard asdf',
  resave: false,
  saveUninitialized: true
}
));

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

/* ------------
  Use - passport
-------------- */

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

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
// ===========  SIGN IN ============

// track Sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
  // User.findById(id, function(err, user) {
  // });
    done(null, obj);
});

// configuration
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//- Route for signIn
app.post('/gallery/signIn',
  passport.authenticate('local', {  successRedirect: '/secret',
                                    failureRedirect: '/gallery/signIn',
                                    failureFlash: true})
);
app.get('/gallery/signIn', function (req, res){
  res.render('signIn', {user: req.user, message: req.flash('error')});
});
app.get('/logout', function (req, res) {
  req.logout();
  reqredirect('/gallery');
});
app.get('/', function (req,res){
  res.send('hello');
});
app.get('/secret', ensureAuthenticated, function (req, res){
  res.send("secret");
});

function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()) {return next();}
  res.redirect('/gallery/signIn');
}

var User = {
  findOne: function (opts, cb){
    var user = {
      id: 1,
      username: opts.username,
      password: "omi",
      validPassword: function(password){
        return (password === "omi");
      }
    };
  cb( null, user );
  }
};




// ========== END SIGN IN =========
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

// app.put('/gallery/edit/:id', function (res, req, next){
//    //- find out a way to find by id
//     //- .then method (similar to index code)
//     //- promises

//    Photo.update({
//     title: req.body.title,
//     url: req.body.url,
//     description: req.body.description,
//     author: req.body.author
//   })
//     .then(function (photo) {
//       res.redirect('/gallery/edit/:id');
//     });
// });


// server function
startServer();

function startServer(){
  var server = app.listen(3000, function(){
    var port = server.address().port;
    db.sequelize.sync();
    console.log('Listening on port' + port);

  });
}