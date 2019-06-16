import React from 'react';
import PropTypes from 'prop-types'

// connect 现在是接受一个参数 mapStateToPRops 然后返回一个函数，这个函数接受一个参数为组件
// 这个返回的函数才是高阶组件 
export const connect = (mapStateToProps) => (WrappedComponent) => {
  class Connect extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }

    // 接收一个组件作为参数 把此组件当成子组件进行渲染
    render () {
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState())
      // { ...stateProps 意思就是把这个对象里面的属性全部通过props方式传递进去 }
      return <WrappedComponent {...stateProps} />
    }
  }

  // 返回一个组件
  return Connect
}