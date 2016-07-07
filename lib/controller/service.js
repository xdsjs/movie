var _ = require('underscore')
var Movie = require('../../models/movie')

var service = {
  detailPost: function (req, res) { //详情页表单数据提交
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if(id !== 'undefined'){
      Movie.findById(id, function (err, movie) {
        if (err) {
          console.log(err);
        }
        //用post过来的电影数据替换掉老的电影数据
        _movie = _.extend(movie, movieObj);
        _movie.save(function (err, movie) {
          if (err) {
            console.log(err);
          }
          //如果成功的话则重定向到电影的详情页
          res.redirect('/movie' + movie._id);
        });
      });
    }else { //电影是新加的
      _movie = new Movie({
        doctor: movieObj.doctor,
        title: movieObj.title,
        language: movieObj.language,
        country: movieObj.country,
        summary: movieObj.summary,
        poster: movieObj.poster,
        flash: movieObj.flash,
        year: movieObj.year,
      });

      _movie.save(function (err, movie) {
        if (err) {
          console.log(err);
        }
        //如果成功的话则重定向到电影的详情页
        res.redirect('/movie/' + movie._id);
      });
    }
  },
  adminUpdate: function (req, res) { //列表页点击更新电影信息
    var id = req.params._id;
    Movie.findById(id, function (err, movie) {
      res.render('admin', {
        title: '后台更新页',
        movie: movie
      });
    })
  }
}

module.exports = service;
