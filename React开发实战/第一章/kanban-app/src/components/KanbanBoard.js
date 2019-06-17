import React, { Component } from 'react'
import List from './List'


class KanbanBoard extends Component {
  render () {
    return (
      <div className="app">
        <List id="todo" title="To Do" cards={ this.props.cards.fileter( (card) => card.status === 'todo' ) } />
        <List id="in-progress" title="In Pro" cards={ this.props.cards.fileter( (card) => card.status === 'in-progress' ) } />
        <List id="done" title="Done" cards={ this.props.cards.fileter( (card) => card.status === 'done' ) } />
      </div>
    )
  }
}

export default KanbanBoard