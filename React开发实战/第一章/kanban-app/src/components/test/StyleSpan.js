import React, { Component } from 'react'

class StyleSpan extends Component {
  // 可以自动追加正确的单位
  render () {
    let divStyle = {
      width: 100,
      height: 30,
      padding: 5,
      backgroundColor: '#ee9900'
    }

    return (
      <div style={ divStyle }>
        Hello World
      </div>
    )
  }
}


export default StyleSpan