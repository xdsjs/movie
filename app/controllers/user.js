// user相关
var User = require('../models/user')

// 注册
exports.signup = function (req, res) {
  var _user = req.body.user

  User.find({name: _user.name}, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (user.length !== 0) {
      console.log('该用户已存在!');
      return res.redirect('/user/showsignin')
    }else {
      var user = new User(_user)
      user.save(function (err, user) {
        if (err) {
          console.log(err);
        }
        console.log('注册成功');
        res.redirect('/user/showsignin')
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
      return res.redirect('/user/showsignup')
    }else {
      user.comparePassword(password, function (err, isMatched) {
        if (err) {
          console.log(err);
        }
        if (isMatched) {
          req.session.user = user
          res.redirect('/')
          console.log('password is matched:)');
        }else {
          res.redirect('/user/showsignin')
          console.log('password is not matched:(');
        }
      })
    }
  })
}

// 注册页面
exports.showsignup = function (req, res) {
  res.render('signup', {
    title: '注册页面'
  })
}

// 登陆页面
exports.showsignin = function (req, res) {
  res.render('signin', {
    title: '登陆页面'
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

// 中间件－用户登录
exports.signinRequired = function (req, res, next) {
  var _user = req.session.user

  if (!_user) {
    return res.redirect('/user/showsignin')
  }

  next()
}

// 中间件－管理员
exports.adminRequired = function (req, res, next) {
  var _user = req.session.user
  if (_user.role <= 10) {
    return res.redirect('/user/showsignin')
  }
  next()
}
