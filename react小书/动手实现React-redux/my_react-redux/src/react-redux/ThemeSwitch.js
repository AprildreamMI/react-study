import React from 'react'
import PropTypes from 'prop-types'

class ThemeSwitch extends React.Component {

  // 规定context类型
  static contextTypes = {
    store: PropTypes.object
  }

  constructor () {
    super()
    this.state = { themeColor: '' }
  }

  componentWillMount () {
    this._updateThemeColor()
    const { store } = this.context
    store.subscribe( () => this._updateThemeColor() )
  }

  _updateThemeColor () {
    const { store } = this.context
    const state = store.getState()
    this.setState({
      themeColor: state.themeColor
    })
  }

  handleSwitchColor (color) {
    const { store } = this.context
    console.log(color)
    store.dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color
    })
  }

  render () {
    return (
      <div>
        <button style={{ color: this.state.themeColor }} 
                onClick={ this.handleSwitchColor.bind(this, 'red') }>
          Red
        </button>
        <button style={{ color: this.state.themeColor }}
                onClick={ this.handleSwitchColor.bind(this, 'blue') }>
          Blue
        </button>
      </div>
    )
  }
}

export default ThemeSwitch