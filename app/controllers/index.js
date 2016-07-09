// 负责和首页进行交互
var Movie = require('../models/movie')

/* GET home page. */
exports.index = function(req, res, next) {

  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('index', {
      title: '首页',
      movies: movies
    });
  })
}
