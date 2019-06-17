import React, { Component } from 'react'
// 使用connect_1 引入
import { connect } from 'dva'

class Home extends Component {
  render () {
    console.log(this.props.num)
    return (
      <React.Fragment>
        <h1>
          数量：{ this.props.num }
        </h1>
        <button onClick={ e=> {
          this.props.dispatch({ type: 'index/changeNum', payload: { num:8 } })
        } }>
          增加number
        </button>
      </React.Fragment>
    )
  }
}

export default connect(state => {
  console.log(state)
  // 使用connect_2 声明在prop中需要使用的
  return {
    // 通过命名去state 中去取
    num: state.index.num
  }
})(Home)
