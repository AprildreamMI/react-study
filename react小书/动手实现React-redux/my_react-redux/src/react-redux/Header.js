import React from 'react'
import PropTypes from 'prop-types'

class Header extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor () {
    super()
    this.state = {
      themeColor: ''
    }
  }

  componentWillMount () {
    this._updateThemeColor()
    const { store } = this.context
    store.subscribe( () => this._updateThemeColor() )
  }

  _updateThemeColor () {
    console.log(this.context)
    const { store } = this.context
    const state = store.getState()
    this.setState({
      themeColor: state.themeColor
    })
  }

  render () {
    return (
      <h1 style={{ color: this.state.themeColor }}>
        React.js 小书
      </h1>
    )
  }
}

export default Header