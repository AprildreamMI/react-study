import React from 'react'

class Input extends React.Component {
  render () {
    return (
      <React.Fragment>
        <a href="./index2.html">index2html</a>
        <input type="number" onChange={ e=> {
          this.props.inputNumber(e.target.value)
        } } />
      </React.Fragment>
    )
  }
}

class PercentageShower extends React.Component {
  render () {
    return (
      <div>
        {
          Math.round(this.props.number * 100)
        }%
      </div>
    )
  }
}

class PercentageApp extends React.Component {
  constructor () {
    super()
    this.state = {
      number: 0
    }
  }
  inputNumber (number) {
    console.log(number)
    this.setState({
      number: number
    })
  }
  render () {
    return (
      <React.Fragment>
        <Input inputNumber={ this.inputNumber.bind(this) }/>
        <PercentageShower number={ this.state.number } />
      </React.Fragment>
    )
  }
}


export default PercentageApp