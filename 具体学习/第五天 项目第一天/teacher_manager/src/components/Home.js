import React, { Component } from 'react'
// 使用connect_1 引入
import { connect } from 'dva'

// 引入嵌套路由的数组
import { homeSubRouters, MyRoute as Route, MyRouter as Router } from '../routers';
import TeacherLoading from './common/TeacherLoading.js';

class Home extends Component {
  constructor () {
    super()
    let avatar = JSON.parse(sessionStorage.getItem('user') || { 'avatar': '' }).avatar
    this.state = {
      avatar: `http://localhost:3000/${avatar}`
    }
  }
  render () {
    return (
      <div>
        <div className="aside">
          <div className="profile">
            <div className="avatar img-circle">
              <img src={ this.state.avatar } alt="头像"/>
            </div>
            <h4>

            </h4>
          </div>
          <div className="navs">
            <ul className="list-unstyled">
              <li>
                <a>
                  <i className="fa fa-home"></i>
                  仪表盘
                </a>
              </li>
              <li>
                <a href="../user/list.html">
                  <i className="fa fa-bell"></i>
                  用户管理
                </a>
              </li>
              <li>
                <a>
                  <i className="fa fa-bell"></i>
                  讲师管理
                </a>
              </li>
              <li>
                <a>
                  <i className="fa fa-cog"></i>
                  课程管理
                    <i className="arrow fa fa-angle-right"></i>
                </a>

              </li>
              <li>
                <a href="../advert/list.html">
                  <i className="fa fa-bell"></i>
                  广告管理
                </a>
              </li>
              <li>
                <a>
                  <i className="fa fa-cog"></i>
                  系统设置
                    <i className="arrow fa fa-angle-right"></i>
                </a>
                <ul className="list-unstyled">
                  <li>
                    <a href="javascript:;">
                      网站设置
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      权限管理
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="main">
          <div className="container-fluid">
            <div className="header">
              <nav className="navbar navbar-custom">
                <div className="navbar-header">
                  <a href="javascript:;" className="navbar-brand">
                    <i className="fa fa-navicon"></i>
                  </a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href="javascript:;">
                      <i className="fa fa-bell"></i>
                      <span className="badge">8</span>
                    </a>
                  </li>
                  <li>
                    <a href="../index/settings.html">
                      <i className="fa fa-user"></i>
                      个人中心
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <i className="fa fa-sign-out"></i>
                      退出
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <i className="fa fa-tasks"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <TeacherLoading />
            {/* 嵌套路由 */}
            {
              homeSubRouters.map((route, i)=>{
                return <Route key={i} path={route.path} component={route.component}/>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  // 使用connect_2 声明在prop中需要使用的
  return {
  }
})(Home)
