var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', {
    title: 'ARCHITEKT',
    header: '_ARCHITEKT',
    intro: 'Welcome to our online portfolio, we are small group of passionate designers and architects, looking to change and create amazing digital images to inspire others to follow in our innovative steps.  Free Architect WordPress Theme'
  });
});
module.exports = router;