import React, { Component } from 'react'
import PropTypes from 'prop-types'


class SearchBar extends Component {
  static propTypes = {
    filterText: PropTypes.string.isRequired,
    onUserInput: PropTypes.func.isRequired
  }

  handelChange (e) {
    this.props.onUserInput(e.target.value)
  }

  render () {
    return <input type="search" value={ this.props.filterText } placeholder="搜索联系人"
            onChange={ this.handelChange.bind(this) } />
  }
}

export default SearchBar