var express = require('express');
var router = express.Router();
var Movie = require('../models/movie')


router.get('/:id', function (req, res) {
  var id = req.params.id
  Movie.findById(id, function (err, movie) {
    if (err) {
      console.log(err);
    }
    res.render('detail',{
      title: '详情页',
      movie: movie
    });
  })
});

module.exports = router;
