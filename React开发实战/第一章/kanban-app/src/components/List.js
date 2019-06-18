import React, { Component } from 'react'
import propTypes from 'prop-types'

import Card from './Card.js'

class List extends Component {
  static propTypes =  {
  }


  render () {
    let cards = this.props.cards.map( (card) => {
      return <Card id={ card.id } title={ card.title } description={ card.description } color={ card.color } tasks={ card.tasks } key={ card.id } />
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