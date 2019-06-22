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
const resJson = (res, { result = {}, code = 0, message = 'data ok' }, statusCode = 200 ) => {
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

module.exports = {
  // 新闻的创建
  getAll: function(req, res, next){
    var sql = 'SELECT * FROM test';
    db.query(sql,function (err,result) {
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
      if (err) return resJson(res, { code: -1, message: err.message})
      return resJson(res, {
          result: {
              user: result
          },
          message: '登录成功'
      })
    })
  }
};