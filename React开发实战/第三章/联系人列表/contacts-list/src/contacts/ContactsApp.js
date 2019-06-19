import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SearchBar from './SearchBar'
import ContactsList from './ContactsList'

class ContactsApp extends Component {
  constructor () {
    super()
    this.state = {
      filterText: ''
    }
  }

  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired
  }
  handelUserInput (searchTerm) {
    console.log(searchTerm)
    this.setState({
      filterText: searchTerm
    })
  }

  render () {
    return (
      <div>
        <SearchBar onUserInput={ this.handelUserInput.bind(this) } filterText={ this.state.filterText } />
        <ContactsList filterText={ this.state.filterText } contacts={ this.props.contacts } />
      </div>
    )
  }
}

export default ContactsApp