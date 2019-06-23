var MilinBookController = require('../controllers/milinbook.server.controller');


module.exports = function(app){
  // 监听url 调用数据操作模块中的方法
  app.route('/api/test')
    .get(MilinBookController.getAll)

  /**
   * 教师登录
   */
  app.route('/api/signin')
    .post(MilinBookController.signin)

  // 获取教师列表 传入页码和每页条数
  app.route('/api/teachers')
    .get(MilinBookController.getTeachers)
};