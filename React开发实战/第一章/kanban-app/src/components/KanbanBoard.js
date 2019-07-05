import React, { Component } from 'react'
import PropTypes from 'prop-types'
// ******* 【Drag_1】使用拖拽  作为拖拽上下文对象  *******
import { DndProvider } from 'react-dnd'
// ******* 【Drag_2】使用HTML5后端  *******
import HTML5Backend from 'react-dnd-html5-backend'

import List from './List'

class KanbanBoard extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    taskCallbacks: PropTypes.objectOf(PropTypes.func).isRequired,
    cardCallbacks: PropTypes.objectOf(PropTypes.func).isRequired,
  }
  render () {
    return (
      <DndProvider backend={ HTML5Backend }>
        <div className="app">
          <List id="todo" title="To Do" cards={ this.props.cards.filter( (card) => card.status === 'todo' ) }
            taskCallbacks={ this.props.taskCallbacks }
            cardCallbacks={ this.props.cardCallbacks }
          />
          <List id="in-progress" title="In Pro" cards={ this.props.cards.filter( (card) => card.status === 'in-progress' ) } 
            taskCallbacks={ this.props.taskCallbacks }
            cardCallbacks={ this.props.cardCallbacks }
          />
          <List id="done" title="Done" cards={ this.props.cards.filter( (card) => card.status === 'done' ) } 
            taskCallbacks={ this.props.taskCallbacks }
            cardCallbacks={ this.props.cardCallbacks }
          />
        </div>
      </DndProvider>
    )
  }
}

// ******* 【Drag_3】使用 DragDropContext 对根元素进行包装  *******
export default KanbanBoard