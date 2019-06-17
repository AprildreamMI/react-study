import React, { Component } from 'react'

class GroceryItem extends Component {
  render () {
    return (
      <li>
        { this.props.quantity } * { this.props.name }
      </li>
    )
  }
}

export default GroceryItem