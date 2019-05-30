import React from 'react'
// 引入传值约束的包
import PropTypes from 'prop-types'

class Son extends React.Component {

  // prop 属性的约定
  static propTypes = {
    text: PropTypes.string.isRequired || Number
  }

  static defaultProps = {
    text: 'abc'
  }

  constructor (props) {
    super(props)
    this.state = {
      num: 1
    }
  }
  render () {
    // 解构赋值 拿到prop中相同属性名的值
    // 声明一个name和age属性，对this.prop中的同名属性进行赋值
    let {age, name, text} = this.props
    console.log('props', this.props)
    return (
      <div>
        我是son 子组件
        <hr />
        { text }
        <hr />
        { age }, {name}
        <hr />
        {/* 传入的底部DOM 内联的样式必须放在 {} 中，然后是一个对象 使用驼峰命名 */}
        <div style={ {backgroundColor: 'red'} }>
          { this.props.header }
        </div>
        
        {/* 必须显示的在子组件中输出 才能显示在父组件中的子组件里slot中的DOM */}
        { this.props.children }

        {/* 传入的头部DOM */}
        <div style={ {backgroundColor: 'green'} }>
          { this.props.header }
        </div>
      </div>
    )
  }
}

export default Son