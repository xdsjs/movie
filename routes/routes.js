var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')

module.exports = function (app) {

  // 预处理将session中的user添加到本地变量中去
  app.use(function (req, res, next) {
    var _user = req.session.user
    app.locals.user = _user
    next()
  })
  // 首页
  app.get('/', Index.index)
  //　电影列表
  app.get('/admin/list', Movie.list)
  // 录入电影
  app.get('/admin/movie', Movie.new)
  // 删除电影
  app.delete('/admin/list', Movie.delete)
  //　更新电影信息
  app.get('/admin/update/:id', Movie.update)
  // 保存录入的电影到后台
  app.post('/admin/movie/new', Movie.save)
  //　查看电影详情
  app.get('/movie/:id', Movie.detail)
  // 用户列表
  app.get('/admin/userlist', User.list)
  // 注册
  app.post('/user/signup', User.signup)
  // 登录
  app.post('/user/signin', User.signin)
  // 登出
  app.get('/user/logout', User.logout)
}
