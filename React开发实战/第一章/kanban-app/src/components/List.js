import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from './Card.js'

class List extends Component {
  static propTypes =  {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    taskCallbacks: PropTypes.objectOf(PropTypes.func).isRequired
  }
  render () {
    let cards = this.props.cards.map( (card) => {
      return <Card { ...card } key={ card.id }
        taskCallbacks={ this.props.taskCallbacks }
      />
    } )
    return (
      <div className="list">
        <h1>
          { this.props.title }
        </h1>
        { cards }
      </div>
    )
  }
}


export default List