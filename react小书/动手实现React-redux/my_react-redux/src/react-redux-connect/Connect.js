import React from 'react';
import PropTypes from 'prop-types'

// connect 现在是接受一个参数 mapStateToPRops 然后返回一个函数，这个函数接受一个参数为组件
// 这个返回的函数才是高阶组件 
// eslint-disable-next-line no-undef
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor () {
      super()
      this.state = {
        allProps: {}
      }
    }
  
    componentWillMount () {
      const { store } = this.context
      this._updateProps()
      store.subscribe( () => this._updateProps() )
    }
  
    _updateProps () {
      const { store } = this.context
      // 额外传入this.props
      let stateProps = mapStateToProps
        ? mapStateToProps(store.getState(), this.props)
        : {} // 防止 mapStateToProps 没有传入
      let dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch, this.props)
        : {} // 防止 mapDispatchToProps 没有传入
      this.setState({
        // 整合普通的props 和从 state 生成的props
        allProps: {
          ...stateProps,
          ...this.props,
          ...dispatchProps
        }
      })
    }

    // 接收一个组件作为参数 把此组件当成子组件进行渲染
    render () {
      // { ...stateProps 意思就是把这个对象里面的属性全部通过props方式传递进去 }
      return <WrappedComponent {...this.state.allProps} />
    }
  }

  // 返回一个组件
  return Connect
}



