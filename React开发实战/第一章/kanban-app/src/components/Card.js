import React, { Component } from 'react'
import PropTypes from 'prop-types'
// 使用动画
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// ******* 【Drag_1】使用拖拽  作为拖拽源  *******
import { DragSource } from 'react-dnd'
// 使用Markdown
import marked from 'marked'

import CheckList from './CheckList'
// 引入常量文件
import constants from '../utils/constants'

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

//  ******* 【Drag_2 书写Spec对象 】  *******
/* 
  描述了增强组件是如何响应拖拽和放置事件的，他是一个包含了若干函数的普通JavaScript对象，这些甘薯会在拖拽交互发生时被调用
  对于DragSource 有
  1. beginDrag
  2. endDrag
*/
const cardDragSpec = {
  beginDrag (props) {
    return {
      id: props.id
    }
  }
}


// ******* 【Drag_3 书写collectDrag 函数对象 】 *******
/**
 * 通过collect 函数来控制哪些属性需要进行注入以及如何进行注入
 * 可以在注入前对属性进行预处理，改变其名称
 * @param {*} connect 
 * @param {*} monitor 
 */
let collectDrag = (connect, monitor) => {
  return {
    // 拖拽源头
    connectDragSource: connect.dragSource()
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
    taskCallbacks: PropTypes.objectOf(PropTypes.func).isRequired,
    cardCallbacks: PropTypes.objectOf(PropTypes.func).isRequired,
    // ******* 【Drag_4 collectDrag中返回的属性会注入到props中 】 *******
    connectDragSource: PropTypes.func.isRequired
  }
  constructor () {
    super()
    this.state = {
      showDetails: false
    }
  }
  render () {
    // 【Drag_5 获取高阶组价connectDragSource 】
    const { connectDragSource } = this.props
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
      // ******* 【Drag_6 使用高阶组件高阶组价connectDragSource 】 *******
      connectDragSource (
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
    )
  }
}

// ******* 【Drag_7 传入 type值(用来唯一标识), spec对象(响应拖拽事件), collect(函数 用来做属性的注入)  】 *******
export default DragSource(constants.CARD, cardDragSpec, collectDrag)(Card)