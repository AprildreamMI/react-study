import React, { Component } from 'react'
import ListItem from './GroceryItem'

class GroceryList extends Component {
  render () {
    return (
      <ul>
        <ListItem quantity="1" name="Bread" />
        <ListItem quantity="2" name="Eggs" />
        <ListItem quantity="3" name="Milk" />
      </ul>
    )
  }
}


export default GroceryList