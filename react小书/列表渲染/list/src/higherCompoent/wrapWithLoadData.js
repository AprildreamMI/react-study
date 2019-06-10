import React from 'react'

export default (WrappeCompoent, name) => {
  class NewComponent extends React.Component {
    constructor () {
      super()
      this.state = {
        data: null
      }
    }

    componentWillMount () {
      let data = localStorage.getItem(name)
      this.setState({data})
    }

    render () {
      return <WrappeCompoent data={ this.state.data } />
    }
  }

  return NewComponent
}