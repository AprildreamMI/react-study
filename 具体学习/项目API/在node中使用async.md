# 在node中使用async
## 安装
```javascript
npm i async -S
```

## 使用

### async.waterfall

> 上一个异步函数返回结果可以传给下一个异步函数，如果传递过程中，第一个参数出错了也就是真值的话，
> 下一个回调函数将会停止调用，并且直接调用waterfall函数的第二个参数，其实也是个回调函数。并且把错误的参数传过去

```javascript
// 前台登陆
  shopLogin (req, res, next) {
    async.waterfall([
      callback => {
        let sql = `SELECT * FROM tb_customerinfo WHERE CustomerEmail = '${req.body.username}'`
        db.query(sql, (err, result) => {
          if (result.length === 0) {
            callback(new Error('账号不存在'))
          } else {
            callback(err, result[0])
          }
        })
      },
      (userItem, callback) => {
        // 密码正确的话 更新登录次数 和 登录时间
        if (userItem.CustomerPwd === req.body.password) {
          callback(null, userItem)
        } else {
          callback(new Error('密码错误, 请重新输入'))
        }
      },
      (userItem, callback) => {
        let sql = `UPDATE tb_customerinfo SET CustomerLastLogTime = '${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}' WHERE CustomerId = ${userItem.CustomerId}`
        db.query(sql, (err, result) => {
          if (result.affectedRows === 1) {
            callback(err, userItem)
          } else {
            callback(new Error('更新登录时间失败，登陆失败'))
          }
        })
      },
      (userItem, callback) => {
        let sql = `UPDATE tb_customerinfo SET CustomerLogCount = CustomerLogCount + 1 WHERE CustomerId = ${userItem.CustomerId}`
        db.query(sql, (err, result) => {
          if (result.affectedRows === 1) {
            callback(err, userItem)
          } else {
            callback(new Error('更新登录次数失败，登陆失败'))
          }
        })
      },
      (userItem, callback) => {
        let sql = `SELECT * FROM tb_customerinfo WHERE CustomerId = ${userItem.CustomerId}`
        db.query(sql, (err, result) => {
          callback(err, result[0])
        })
      },
    ], (err, result) => {
      if (err) {
        res.status(200).json({
          data: null,
          code: -1,
          message: err.message
        })
      } else {
        res.status(200).json({
          data: {
            me: result
          },
          code:0,
          message: "登陆成功"
        })
      }
    })
  },
```

### async.series

```javascript
// 用户注册
  shopSignIn (req, res, next) {
    async.series([
      callback => {
        let query_name_sql = `SELECT * FROM tb_customerinfo WHERE CustomerName = '${req.body.customerName}'`
        db.query(query_name_sql, (err, result) => {
          if (result[0]) {
            return res.status(200).json({
                data: null,
                code: 1,
                message:"昵称重复, 注册失败"
            }); 
          } else {
            callback(err)
          }
        })
      },
      callback => {
        let query_account_sql = `SELECT * FROM tb_customerinfo WHERE CustomerEmail = '${req.body.customerEmail}'`
        db.query(query_account_sql, (err, result) => {
          if (result[0]) {
            return res.status(200).json({
                data: null,
                code: 1,
                message:"邮箱重复, 注册失败"
            }); 
          } else {
            callback(err)
          }
        })
      },
      callback => {
        let query_tel_sql = `SELECT * FROM tb_customerinfo WHERE CustomerTel = '${req.body.customerTel}'`
        db.query(query_tel_sql, (err, result) => {
          if (result[0]) {
            return res.status(200).json({
                data: null,
                code: 1,
                message:"手机号重复, 注册失败"
            }); 
          } else {
            callback(err)
          }
        })
      },
      callback => {
        let sql = `INSERT INTO tb_customerinfo
                  (
                    CustomerName,
                    CustomerEmail,
                    CustomerTrueName,
                    CustomerSex,
                    CustomerTel,
                    CustomerAddr,
                    CustomerPwd,
                    CustomerAvatar,
                    CustomerRegTime,
                    CustomerLogCount
                  )
                  VALUES
                  (
                    '${req.body.customerName}',
                    '${req.body.customerEmail}',
                    '${req.body.customerTrueName}',
                    '${req.body.customerSex}',
                    '${req.body.customerTel}',
                    '${req.body.customerAddr}',
                    '${req.body.customerPwd}',
                    '${req.body.customerAvatar}',
                    '${adminUtils.getNowFormatDate()}',
                    ${0}
                  )`
        db.query(sql, (err, result) => {
          // 查看受影响的行数 如果等于 1 
          if (result.affectedRows === 1) {
            callback(err)
          } else {
            res.status(200).json({
              data: null,
              code: 1,
              message: "注册账号失败"
            })
          }
        })
      }
    ], (err, result) => {
      if (err) {
        res.status(200).json({
          data: err,
          code: 1,
          message: "注册账号失败"
        })
      } else {
        res.status(200).json({
          // 返回新插入的Id
          data: {
            insertId: result.insertId
          },
          code: 0,
          message: "注册账号成功"
        })
      }
    })
  },
```

```
"proxy": {
    "/app": {
      "target": "http://localhost:3000/api/",
      "changeOrigin": "true"
    }
  }
```

