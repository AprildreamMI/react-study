import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'

const ShoppingCartSpec = {
  drop () {
    return {
      name: 'ShoppingCart'
    }
  }
}

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    // 可以使用任意的名字
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

class ShoppingCart extends Component {

  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  }

  render () {
    const { canDrop, isOver, connectDropTarget } = this.props
    // 如果已经拖拽完成已经放下
    const isActive = canDrop && isOver

    let backgroundColor = '#FFFFFF'
    if (isActive) {
      backgroundColor = '#F7F7BD'
    } else {
      backgroundColor = '#F7F7F7'
    }
    const style = {
      backgroundColor: backgroundColor
    }
    return (
      // 拖放目标
      connectDropTarget(
        <div className="shopping-cart" style={ style }>
          {
            isActive?
            'Hummmm, snack!': 'Drag here to order!'
          }
        </div>
      )
    )
  }
}

//  传入参数 type spec 对象 collect函数
export default DropTarget("snack", ShoppingCartSpec, collect)(ShoppingCart)
