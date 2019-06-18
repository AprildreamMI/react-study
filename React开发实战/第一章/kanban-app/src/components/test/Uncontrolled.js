import React, { Component } from 'react'

class Uncontrolled extends Component {
  constructor () {
    super()
    this.state = {
      name: '赵思',
      email: 'magicwingzs@qq.com'
    }
  }
  handelSubmit (e) {
    e.preventDefault()
    console.dir(e.target.name.value)
    console.dir(e.target.Email.value)
  }
  handelChangeInput (e) {
    console.log(e.target.value)
  }
  render () {
    return (
      <form onSubmit={ this.handelSubmit.bind(this) }>
        <div>
          {/* 通过defaultValue 来设置默认值 */}
          Name: <input name="name" type="text" defaultValue={ this.state.name } onChange={ e => this.handelChangeInput(e) } />
        </div>
        <div>
          Email: <input name="Email" type="email" defaultValue={ this.state.email } />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    )
  }
}


export default Uncontrolled