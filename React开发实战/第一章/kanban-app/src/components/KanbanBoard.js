import React, { Component } from 'react'
import PropTypes from 'prop-types'

import List from './List'


class KanbanBoard extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    taskCallbacks: PropTypes.objectOf(PropTypes.func).isRequired
  }
  render () {
    // console.log(this.props.cards)
    return (
      <div className="app">
        <List id="todo" title="To Do" cards={ this.props.cards.filter( (card) => card.status === 'todo' ) }
          taskCallbacks={ this.props.taskCallbacks }
        />
        <List id="in-progress" title="In Pro" cards={ this.props.cards.filter( (card) => card.status === 'in-progress' ) } 
          taskCallbacks={ this.props.taskCallbacks }
        />
        <List id="done" title="Done" cards={ this.props.cards.filter( (card) => card.status === 'done' ) } 
          taskCallbacks={ this.props.taskCallbacks }
        />
      </div>
    )
  }
}

export default KanbanBoard