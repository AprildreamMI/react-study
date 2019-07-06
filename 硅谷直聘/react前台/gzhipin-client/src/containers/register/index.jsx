import React, { Component } from 'react'
import { 
  NavBar, 
  Icon, 
  WingBlank,
  WhiteSpace,
  List, 
  InputItem,
  Radio,
  Button
} from 'antd-mobile'
import { createForm } from 'rc-form'

import Logo from '../../components/logo'
import './index.less'

const Item = List.Item


/**
 * 注册路由组件
 */
class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: 'zhaosi',
      password: '',
      confirmPw: '',
      // dashen/laoban
      type: ''
    }
  }
  // 注册
  handleRegister () {
    console.log('进行注册')
  }
  render () {
    const { getFieldProps } = this.props.form
    return (
    <React.Fragment>
      <NavBar>
        硅&nbsp;谷&nbsp;直&nbsp;聘
      </NavBar>
      <WingBlank>
        <Logo />
        <WhiteSpace size="lg" />
        <List>
          <InputItem
            {...getFieldProps('username', {
              initialValue: this.username,
              onChange(value) {

              }
            })}
          >用户名:</InputItem>
          <WhiteSpace/>
          <InputItem type="password">密&nbsp;&nbsp;&nbsp;码:</InputItem>
          <WhiteSpace/>
          <InputItem type="password">确认密码:</InputItem>
          <WhiteSpace />
          <Item>
            <span>用户类型:</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
              <Radio 
                className="my-radio" 
                onChange={e => console.log('checkbox', e)}>
                  大神
              </Radio>
              &nbsp;&nbsp;
              <Radio
                className="my-radio" 
                onChange={e => console.log('checkbox', e)}>
                  老板
              </Radio>
          </Item>
        </List>
        <WhiteSpace size="lg" />
        <Button type="primary" onClick={ this.handleRegister.bind(this) }>注&nbsp;&nbsp;&nbsp;册</Button>
        <WhiteSpace />
        <Button>已有帐户</Button>
      </WingBlank>
    </React.Fragment>
    )
  }
}

console.log(createForm)
export default createForm()(Register)