import React, { Component } from 'react'
import PropTypes from 'prop-types'


class ContactItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }

  render () {
    return <li>{ this.props.name } - { this.props.email }</li>
  }
}

export default ContactItem