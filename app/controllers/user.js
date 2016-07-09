// user相关
var User = require('../models/user')

exports.signup = function (req, res) {
  var _user = req.body.user

  User.find({name: _user.name}, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (user.length !== 0) {
      console.log('该用户已存在!');
      return res.redirect('/')
    }else {
      var user = new User(_user)
      user.save(function (err, user) {
        if (err) {
          console.log(err);
        }
        res.redirect('/admin/userlist')
      })
    }
  })
}

// 登录
exports.signin = function (req, res) {
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  User.findOne({name: name}, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      return res.redirect('/')
    }else {
      user.comparePassword(password, function (err, isMatched) {
        if (err) {
          console.log(err);
        }
        if (isMatched) {
          req.session.user = user
          console.log('password is matched:)');
          res.redirect('/')
        }else {
          console.log('password is not matched:()');
        }
      })
    }
  })
}

// 登出
exports.logout = function(req, res) {
  delete req.session.user
  // delete app.locals.user
  res.redirect('/')
}

// 用户列表
exports.list =　function (req, res) {
  User.fetch(function (err, users) {
    if (err) {
      console.log(err)
    }
    res.render('userlist', {
      title: '用户列表页',
      movies: users
    })
  })
}
