import React, { Component } from 'react'
import PropTypes from 'prop-types'
// ******* 【Drag_1】使用拖拽  作为拖拽目标  *******
import { DropTarget } from 'react-dnd'

// 引入常量文件
import constants from '../utils/constants'
import Card from './Card.js'


// ******* 【Drag_2】 编写scpec对象  *******
const listTargetSpec = {
  // 在卡片位于列表上方时调用卡片的回调函数来立即更新其状态 拖拽卡片改变其列表
  hover(props, monitor) {
    // 获取拖拽源的id 
    const draggedId = monitor.getItem().id
    // 执行更新卡片的状态的函数 从prop函数中取到父组件传递下来的更新函数
    props.cardCallbacks.updateStatus(draggedId, props.id)
  }
}

// ******* 【Drag_3】 编写collect函数  *******
let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }

}

class List extends Component {
  static propTypes =  {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    taskCallbacks: PropTypes.objectOf(PropTypes.func).isRequired,
    cardCallbacks: PropTypes.objectOf(PropTypes.func).isRequired,
    // ******* 【Drag_4】 验证 connectDropTarget  *******
    connectDropTarget: PropTypes.func.isRequired
  }
  render () {
    // ******* 【Drag_5】 从props中获取connectDropTarget  *******
    const { connectDropTarget } = this.props


    let cards = this.props.cards.map( (card) => {
      return <Card { ...card } key={ card.id }
        taskCallbacks={ this.props.taskCallbacks }
        cardCallbacks={ this.props.cardCallbacks }
      />
    } )
    return (
      // ******* 【Drag_6】 使用connectDropTarget高阶组件  *******
      connectDropTarget (
        <div className="list">
          <h1>
            { this.props.title }
          </h1>
          { cards }
        </div>
      )
    )
  }
}

// ******* 【Drag_7】 使用使用高阶组件DropTarget  *******
export default DropTarget(constants.CARD, listTargetSpec, collect)(List)