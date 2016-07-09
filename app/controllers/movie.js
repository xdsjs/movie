// 与后台管理相关
var Movie = require('../models/movie')
var _ = require('underscore')

// 电影详情
exports.detail = function (req, res) {
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
}

// 电影列表
exports.list =　function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err)
    }
    res.render('list', {
      title: '列表页',
      movies: movies
    })
  })
}

// 录入新电影
exports.new =　function (req, res) {
  res.render('admin',{
    title:'后台录入页',
    movie: {
      doctor: '',
      country: '',
      title: '',
      year: '',
      poster: '',
      language: '',
      flash: '',
      summary: '',
    }
  })
}

// 删除一个电影
exports.delete = function (req, res) {
  var id = req.query.id// IDEA:
  if (id) {
    Movie.remove({_id: id},function (err, movie) {
      if (err) {
        console.log(err)
      }else {
        res.json({success: 1})
      }
    })
  }
}

//　更新电影信息
exports.update = function (req, res) {
  var id = req.params.id
  Movie.findById(id, function (err, movie) {
    if (err) {
      console.log(err);
    }
    res.render('admin',{
      title: '后台录入页',
      movie: movie
    });
  })
}

// 保存新录入的电影到后台
exports.save = function (req, res) { //详情页表单数据提交
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
        res.redirect('/movie/' + movie._id);
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
}
