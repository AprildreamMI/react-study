import React, { Component } from 'react'
import PropTypes from 'prop-types'

import List from './List'


class KanbanBoard extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired
  }
  render () {
    // console.log(this.props.cards)
    return (
      <div className="app">
        <List id="todo" title="To Do" cards={ this.props.cards.filter( (card) => card.status === 'todo' ) } />
        <List id="in-progress" title="In Pro" cards={ this.props.cards.filter( (card) => card.status === 'in-progress' ) } />
        <List id="done" title="Done" cards={ this.props.cards.filter( (card) => card.status === 'done' ) } />
      </div>
    )
  }
}

export default KanbanBoard