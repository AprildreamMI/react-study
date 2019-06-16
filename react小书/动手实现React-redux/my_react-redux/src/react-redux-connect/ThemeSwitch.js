import React from 'react'
import PropTypes from 'prop-types'
import { connect } from './Connect'

class ThemeSwitch extends React.Component {

  // 规定context类型
  static propTypes = {
    themeColor: PropTypes.string,
    onSwitchColor: PropTypes.func
  }

  handleSwitchColor (color) {
    if (this.props.onSwitchColor) {
      this.props.onSwitchColor(color)
    }
  }

  render () {
    return (
      <div>
        <button style={{ color: this.props.themeColor }} 
                onClick={ this.handleSwitchColor.bind(this, 'red') }>
          Red
        </button>
        <button style={{ color: this.props.themeColor }}
                onClick={ this.handleSwitchColor.bind(this, 'blue') }>
          Blue
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
  }
}

export default ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)