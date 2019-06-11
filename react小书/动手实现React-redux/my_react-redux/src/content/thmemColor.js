import React from 'react'
import PropTypes from 'prop-types'

class Index extends React.Component {
  // 验证 getChildContext 返回的对象。
  // 【必写】
  static childContextTypes = {
    themeColor: PropTypes.string
  }

  constructor () {
    super()
    this.state = { themeColor: 'red' }
  }

	// 【必写】
  getChildContext () {
    return { themeColor: this.state.themeColor }
  }

  render () {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}

class Header extends React.Component {
  render () {
    return (
    <div>
      <h2>This is header</h2>
      <Title />
    </div>
    )
  }
}

class Main extends React.Component {
  render () {
    return (
    <div>
      <h2>This is main</h2>
      <Content />
    </div>
    )
  }
}

class Title extends React.Component {
  // 【使用】
  // 【必写】
  static contextTypes = {
    themeColor: PropTypes.string
  }
  render () {
    return (
      // 获取到context
      <h1 style={{ color: this.context.themeColor }}>
        React.js 小书标题
      </h1>
    )
  }
}

class Content extends React.Component {
  render () {
    return (
    <div>
      <h2>React.js 小书内容</h2>
    </div>
    )
  }
}

export default Index