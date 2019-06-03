import React from 'react'

class Son extends React.Component {
  constructor () {
    super()
    this.state = {
      num: 1
    }
  }
  componentDidMount () {
    console.log('son 组件原有的功能')
  }
  render () {
    return (
      <React.Fragment>
        Son 子组件
        <hr />
        { this.state.num }
      </React.Fragment>
    )
  }
}

export default class Wrap extends React.Component {
  constructor () {
    super()
    this.state = {

    }
  }
  componentDidMount () {
    console.log('包装组件中的功能')
  }
  render () {
    return <Son />
  }
}
