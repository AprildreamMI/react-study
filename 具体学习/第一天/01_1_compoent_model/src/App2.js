import React, { Component } from 'react'

export class App2 extends Component {
  constructor () {
    super()
    this.state = {
      num: 2
    }
    // 绑定this
    this.changeHandler = this.changeHandler.bind(this)
  }
  changeHandler (e) {
    console.log(e.target.value)
    // 未作处理的情况下 this 为unfined
    console.log(this)
    this.setState({
      num: e.target.value
    })
  }
  render () {
    return (
      <div>
        <span>
          { this.state.num }
          <hr />
          {/* 在{ } 中调用的时候 其实是在顶级域中进行调用 丢死了原有的this */}
          <input type="text" value={ this.state.num } onChange={ this.changeHandler } />
        </span>
      </div>
    )
  }
}