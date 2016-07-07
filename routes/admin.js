var express = require('express')
var router = express.Router()
var Movie = require('../models/movie')
var service = require('../lib/controller/service')


router.get('/list',function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err)
    }
    res.render('list', {
      title: '列表页',
      movies: movies
    })
  })
})

router.get('/movie',function (req, res) {
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
})

// list delete movie
router.delete('/list', function (req, res) {
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
})

router.post('/movie/new', service.detailPost)


module.exports = router
