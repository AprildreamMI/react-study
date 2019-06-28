import React, { Component } from 'react'
import PropTypes from 'prop-types'
// 使用动画
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// 使用Markdown
import marked from 'marked'

import CheckList from './CheckList'

// 自定义的校验器
let titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName]
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(
        `${propName} in ${componentName} is longer then 80 characters`
      )
    }
  }
}


class Card extends Component {
  static propTypes = {
    id: PropTypes.number,
    // 自定义的校验
    title: titlePropType,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.objectOf(PropTypes.func).isRequired
  }
  constructor () {
    super()
    this.state = {
      showDetails: false
    }
  }
  render () {
    let cardDetails
    // state 的值 更新 会重新调用render函数
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          {/* html 渲染 xss */}
          <span dangerouslySetInnerHTML={ {
            __html: marked(this.props.description)
          } } />
          <CheckList cardId={ this.props.id } tasks={ this.props.tasks } 
            taskCallbacks={ this.props.taskCallbacks }
          />
        </div>
      )
    }

    // 内联样式
    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    }

    return (
      <div className="card">
        <div style={ sideColor } />
        <div className={ this.state.showDetails? "card__title card__title--is-open" : "card__title" } onClick={ () => {
          this.setState({
            showDetails: !this.state.showDetails
          })
        } }>
          { this.props.title }
        </div>
        <ReactCSSTransitionGroup
          transitionName="toggle"
          transitionEnterTimeout={ 250 }
          transitionLeaveTimeout={ 300 }
        >
          { cardDetails }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default Card