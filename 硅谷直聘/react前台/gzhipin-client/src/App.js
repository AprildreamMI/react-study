import React from 'react';
/**
 * HashRouter 使用HashRouter 方式
 * BrowserRouter 使用普通带“#”号方式 <Router></Router>(来使用)
 * Redirect 重定向
 */
import {HashRouter, BrowserRouter as Router, Route,
  NavLink, Switch, Redirect} from 'react-router-dom'

import Register from './containers/register'
import Main from './containers/main'
import Login from './containers/login'



function App() {
  return (
    <Router>
      <Switch>
        {/* 嵌套路由不能有exact关键字来做精确匹配 */}
        <Route path="/register" exact component={ Register } />
        <Route path="/login" exact component={ Login } />
        {/* 默认组件 */}
        <Route component={ Main } />
      </Switch>
    </Router>
  )
}

export default App;
