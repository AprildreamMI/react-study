import React from 'react';
import './App.css';
// 专门用来给浏览器使用的
import {HashRouter, BrowserRouter as Router, Route,
NavLink, Switch, Redirect} from 'react-router-dom'

class User extends React.Component {
  componentDidMount () {
    // 获取id
    // 第一种方式获取
    console.log(this.props.match.params.id)
    console.log(this.props)
  }
  render () {
    return (
      <div>
        <h1>
          用户组件
          <button onClick={ e=> {
            this.props.history.goBack()
          } }>
            后退 前进
          </button>
        </h1>
      </div>
    )
  }
}

class Man extends React.Component {
  render () {
    return (
      <div>
        <h3>男人</h3>
      </div>
    )
  }
}

class Woman extends React.Component {
  render () {
    return (
      <div>
        <h3>女人</h3>
      </div>
    )
  }
}

class Home extends React.Component {
  render () {
    return (
      <div>
        <h1>
          我是首页
        </h1>
        <h2>以下是可变内容</h2>
        {/* 嵌套路由必须写完整路径 */}
        {/* 相同路由造成横向的重复匹配
            会同时出现 “男人”， “女人”
        */}
        <Switch>
          {/* 使用Switch 只匹配一个 */}
          <Route path="/a/man" component={ Man } />
          <Route path="/a/man" component={ Woman } />
          <Route path="/a/woman" component={ Woman } />
        </Switch>
      </div>
    )
  }
}


class App extends React.Component {
  render () {
    let  pathObj1  = {
      pathname: '/user/4',
    }

    let  pathObj2_userq  = {
      pathname: '/userq',
      search: '?id=11',
      state: {name: 'zhaosi'},
      query: {sex: '000'}
    }
    return (
      <div className="App">
        <h1> 头部 </h1>

        {/* Router 相当于规则和坑  */}
        <Router>
          {/* 因为Router 只能又一个子节点 */}
          <React.Fragment>
            <NavLink to="/a/man" activestyle={{ color: '#4dco60' }}>
              男
            </NavLink>
            <NavLink to="/a/woman" activeClassName="selected">
              女
            </NavLink>

            {/* 第一种传参方式 params 直接写路由 */}
            <NavLink to="/user/10" activeClassName="selected">
              去user 字符串传
            </NavLink>
            <NavLink to={ pathObj1 } activeClassName="selected">
              去user 对象方式穿
            </NavLink>

            {/* 第二种方式 query */}
            <NavLink to="/userq?id=1" activeClassName="selected">
              去userq 字符串传
            </NavLink>
            {/* 在this.props.location 传 */}
            <NavLink to={ pathObj2_userq } activeClassName="selected">
              去userq 对象传
            </NavLink>
            <Switch>
              {/* 模糊匹配 只要以/开头的路由都会匹配到 
                  如果不加 exact(精确匹配) 路由为 “/a时”会出现两个 “首页” 
              */}
              <Route path="/" exact component={ Home } />
              {/* 需要有嵌套路由的 不能使用exact */}
              <Route path="/a" component={ Home } />

              {/* 传递参数 路由参数 传递字符串 */}
              <Route path="/user/:id" component={ User } />

            
              <Route path="/userq" component={ User } />
              <Redirect to="/" />
            </Switch>
          </React.Fragment>
        </Router>

        <h1> 底部 </h1>
      </div>
    )
  }
}

export default App;
