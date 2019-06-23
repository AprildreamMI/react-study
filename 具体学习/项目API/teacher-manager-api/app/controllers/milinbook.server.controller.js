// 数据操作模块
var db = require('../models/milinbook.server.model')
var formidable = require('formidable'); //上传功能的插件
var fs = require('fs');
var async = require('async');
var urlPase = require('url');
var moment = require('moment')

/**
 * 封装的res函数
 * @param {*} res response 对象
 * @param {*} statusCode  状态码
 * @param {*} param2  result, code. message
 */
const resJson = (res, { result = {}, code = 0, message = 'data ok' }, statusCode = 200) => {
  console.log('状态码', statusCode)
  res.status(statusCode).json({
    data: result,
    code: code,
    message: message
  });
}

const res500 = (res, message = '数据库错误') => {
  resJson(res, {
    code: 10001,
    message: message
  }, 500)
}

// 添加讲师
const addTeacher = (teacher) => {
  // console.log(teacher)
  let sql = `INSERT INTO teacher_list
            (
              username,
              password,
              nickname,
              brithDay,
              gender,
              phone,
              joinDate,
              email
            )
            VALUES
            (
              '${teacher.username}',
              '${teacher.password}',
              '${teacher.nickname}',
              '${teacher.brithDay}',
              '${teacher.gender}',
              '${teacher.phone}',
              '${teacher.joinDate}',
              '${teacher.email}'
            )`
            console.log(sql)
  db.query(sql, (err, result) => {
    // 查看受影响的行数 如果等于 1 
    if (result.affectedRows === 1) {
      console.log('注册账号成功', result)
    } else {
      console.log('注册账号失败')
    }
  })
}

let ts = [
  {
    username: '阳春白雪',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '阳春黑雪',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '阳春红雪',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '阳春绿雪',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '阳春黄雪',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '无雪',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '无花',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '灵魂摆渡',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '天堂来使',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '火骑士空空',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '阳春白雪2',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '阳春黑雪2',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '阳春红雪2',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '阳春绿雪2',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '阳春黄雪2',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '无雪2',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '无花2',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '灵魂摆渡2',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '天堂来使2',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
  {
    username: '火骑士空空2',
    nickname: '阳春白雪',
    password: '123456',
    phone: '13463438952',
    email: 'yangchunmian@foxmail.com',
    gender: 1,
    brithDay: '1998-12-18',
    joinDate: '2011-10-13'
  },
]



module.exports = {
  // 获取测试数据库中的数据
  getAll: function (req, res, next) {
    var sql = 'SELECT * FROM test';
    db.query(sql, function (err, result) {
      if (err) return res500()
      return resJson(res, {
        result
      })
    })
  },

  /**
   * 登录
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  signin (req, res, next) {
    async.waterfall([
      callback => {
        let sql = `SELECT * FROM teachers WHERE username = '${req.body.username}'`
        db.query(sql, (err, result) => {
          if (result.length === 0) {
            callback(new Error('账号不存在'))
          } else {
            callback(err, result[0])
          }
        })
      },
      (userItem, callback) => {
        if (userItem.password === req.body.password) {
          callback(null, userItem)
        } else {
          callback(new Error('密码错误, 请重新输入'))
        }
      },
      (userItem, callback) => {
        let sql = `SELECT id, username, avatar FROM teachers WHERE id = ${userItem.id}`
        db.query(sql, (err, result) => {
          callback(err, result[0])
        })
      },
    ], (err, result) => {
      if (err) return resJson(res, { code: -1, message: err.message })
      return resJson(res, {
        result: {
          user: result
        },
        message: '登录成功'
      })
    })
  },

  /**
   * 获取教师列表
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  getTeachers (req, res, next) {
    async.waterfall([
      callback => {
        let sql = ''
        // 获取总条目数
        sql = `SELECT count(*) AS total FROM teacher_list`
        db.query(sql, (err, result) => {
          // 传入总条目数
          callback(err, result[0].total)
        })
      },
      (total, callback) => {
        if (total <= 0) {
          callback(null, {
            result: [],
            total: 0
          })
          return
        }
        let sql = ''
        let page = req.query.page
        if (page > total) {
          page = total
        }
        let skip = (page - 1) * req.query.count
        sql = `SELECT * FROM teacher_list LIMIT ${skip}, ${req.query.count}`
        db.query(sql, (err, result) => {
          callback(err, {
            result: result,
            total: total
          })
        })
      }
    ], function(err, results) {
      if (err) return resJson(res, { code: -1, message: err.message || '获取讲师列表出错' })
      return resJson(res, {
        result: {
          teachers: results.result,
          total: results.total
        },
        message: '获取讲师列表成功'
      })
    })
  }
};
