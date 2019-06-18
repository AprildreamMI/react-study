import React, { Component } from 'react'
import CheckList from './CheckList'
// 使用Markdown
import marked from 'marked'

class Card extends Component {
  constructor () {
    super()
    this.state = {
      showDetails: false
    }
  }
  render () {
    console.log('Card Poprs', this.props)
    let cardDetails
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          {/* html 渲染 xss */}
          <span dangerouslySetInnerHTML={ {
            __html: marked(this.props.description)
          } } />
          <CheckList cardId={ this.props.id } tasks={ this.props.tasks } />
        </div>
      )
    }

    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    }

    return (
      <div className="card">
        <div style={ sideColor } />
        <div className={ this.state.showDetails? "card__title card__title--is-open" : "card__title" } onClick={ () => {
          this.setState({
            showDetails: !this.state.showDetails
          })
        } }>
          { this.props.title }
        </div>
        { cardDetails }
      </div>
    )
  }
}

export default Card