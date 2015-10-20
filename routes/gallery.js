// this file is to route for the
var express = require('express');
var router = express.Router();

// GET/ ==> view list of gallery photos
router.get('/', function(req, res){
  res.send('gallery home page');
});
// POST/gallery ==> new gallery photo
router.post('/', function(req, res){
  res.send('gallery post page');
});


// GET/gallery/:id ==> see single gallery photo
  // photo include a link to delete photo
  // photo link to edit photo
router.get('/:id', function(req, res){
  res.send('see single photo');
});

  // PUT/gallery/:id ==> updates single photo
router.put('/:id', function(req, res){
  res.send('PUT single photo');
});

  // DELETE/gallery/:id ==> delete single photo
router.delete('/:id', function(req, res){
  res.send('DELETE single photo');
});

// GET/gallery/:id/edit ==> edit form identified by :id
  // fields:
    //author: Text
    // link: Text(image URL)
    // description: TextArea
// route.route('/:id/edit', function(req, res){
//   res.send('edit single photo');
// });


// GET/gallery/new ==> form
  // fields:
    // author: Text
    // link: Text(imgage URL)
    // description: TextArea
router.get('/new/', function(req, res){
  res.send('new form for user to fill');
});

module.exports = router;


