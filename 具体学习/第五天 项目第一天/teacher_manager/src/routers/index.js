
// 配置路由规则
import React from 'react'
import { Router, Route, NavLink, Switch, Redirect } from 'dva/router'

import Loading from '../components/common/Loading.js';

import Home from '../components/Home'
import Signin from '../components/Signin'
import TeacherList from '../components/TeacherList';

export const MyRouter = Router
export const MyRoute = Route;
export const homeSubRouters = [
  {
    path: '/home/list',
    component: TeacherList
  }
]

// 使用history 需要先进行声明
let fn = function ({ history, app }) {
  return (
    <Router history={ history }>
      <React.Fragment>
        {/* 引入全局的Loading */}
        <Loading />
        <Switch>
          {/* 嵌套路由不能有exact关键字来做精确匹配 */}
          <Route path="/home" component={ Home } />
          <Route path="/signin" exact component={ Signin } />
          <Redirect to="/signin" />
        </Switch>
      </React.Fragment>
    </Router>
  )
}


// 导出为函数
export default fn;
