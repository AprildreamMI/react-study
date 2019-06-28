import React, {Component } from 'react'
import PropTypes from 'prop-types'

import { DragSource }  from 'react-dnd'

const snackSpec = {
  // 拖拽这个组件开始
  beginDrag(props) {
    return {
      name: props.name
    }
  },
  // 拖拽这个组件结束
  endDrag(props, monitor) {
    // 拖拽的这一项
    const dragItem = monitor.getItem()
    // 拖拽的目标容器
    const dropResult = monitor.getDropResult()

    // 如果目标容易存在
    if (dropResult) {
      console.log(`You dropped ${dragItem.name} into ${dropResult.name}`)
    }
  }
}

let collect = (connect, monitor) => {
  return {
    // 拖拽的这一项 拖拽源头
    connectDragSource: connect.dragSource(),
    // 是否拖动了出来
    isDragging: monitor.isDragging()
  }
}

class Snack extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  }
  render () {
    const { name, isDragging, connectDragSource } = this.props

    // 如果拖动了出来 则改变其透明度
    let opacity = isDragging? 0.4 : 1

    const style = {
      opacity: opacity
    }

    return (
      connectDragSource(
        <div className="snack" style={ style }>
          {
            name
          }
        </div>
      )
    )
  }
}

export default DragSource('snack', snackSpec, collect)(Snack)