var express = require('express');
var Movie = require('../models/movie')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('index', {
      title: '首页',
      movies: movies
    });
  })
});

module.exports = router;
