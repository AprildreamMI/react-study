
// 配置路由规则
import React from 'react'
import { Router, Route, NavLink, Switch, Redirect } from 'dva/router'

import Home from '../components/Home'
import Signin from '../components/Signin'

// 使用history 需要先进行声明
let fn = function ({ history, app }) {
  return (
    <Router history={ history }>
      <React.Fragment>
        <Route path="/home" exact component={ Home } />
        <Route path="/signin" exact component={ Signin } />
      </React.Fragment>
    </Router>
  )
}


// 导出为函数
export default fn;