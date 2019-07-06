import React, { Component } from 'react'
import { 
  NavBar, 
  WingBlank,
  WhiteSpace,
  List, 
  InputItem,
  Radio,
  Button
} from 'antd-mobile'

import Logo from '../../components/logo'

const Item = List.Item


/**
 * 注册路由组件
 */
class Login extends Component {
 render () {
  return (
   <React.Fragment>
    <NavBar>
      硅&nbsp;谷&nbsp;直&nbsp;聘
    </NavBar>
    <WingBlank>
      <Logo />
      <WhiteSpace size="lg" />
      <List>
        <InputItem>用户名:</InputItem>
        <WhiteSpace/>
        <InputItem type="password">密&nbsp;&nbsp;&nbsp;码:</InputItem>
      </List>
      <WhiteSpace size="lg" />
      <Button type="primary">登&nbsp;&nbsp;&nbsp;陆</Button>
      <WhiteSpace />
      <Button>还没有账户</Button>
    </WingBlank>
   </React.Fragment>
  )
 }
}


export default Login