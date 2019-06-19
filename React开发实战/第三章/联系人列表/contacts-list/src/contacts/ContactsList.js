import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ContactItem from './ContactItem'

class ContactsList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    filterText: PropTypes.string.isRequired
  }

  render () {
    let filteredContacts = this.props.contacts.filter(contact =>
      contact.name.indexOf(this.props.filterText) !== -1
    )

    return (
      <ul>
        {
          filteredContacts.map(contact => 
            <ContactItem key={ contact.email } name={ contact.name } email={ contact.email } />
          )
        }
      </ul>
    )
  }
}

export default ContactsList