import React, { Component } from 'react'
import { connect } from 'dva'

// 处理图片 手动告知webPack 加载图片
import monkey from '../assets/img/monkey.png'

class Signin extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handelSignin (e) {
    e.preventDefault()
    let { username, password } = this.state
    this.props.dispatch({
      type: 'tearch/doLogin',
      payload: {
        username,
        password
      }
    })
  }
  render () {
    return (
      <React.Fragment>
        <div className="login">
            <div className="login-wrap">
              <div className="avatar">
                <img src={ monkey } className="img-circle" alt="" />
              </div>
              <form action=""  className="col-xs-offset-1 col-xs-10" onSubmit={ e=> this.handelSignin(e) }>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input id="name" type="text" className="form-control" placeholder="用户名"
                    value={ this.state.username } onChange={e=> {
                      this.setState({
                        username: e.target.value
                      })
                    }}
                  />
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-key"></i>
                  </span>
                  <input id="pass" type="password" className="form-control" placeholder="密码" 
                    value={ this.state.password } onChange={e=> {
                      this.setState({
                        password: e.target.value
                      })
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-lg btn-primary btn-block">登 录</button>
              </form>
            </div>
        </div>
      </React.Fragment>
    )
  }
}




export default connect(state=> {
  return {
    isLogin: state.teacher.isLogin
  }
})(Signin)