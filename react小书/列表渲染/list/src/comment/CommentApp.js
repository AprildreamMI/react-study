import React from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends React.Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }
  subMitHandle (content) {
    let { comments } = this.state
    comments.push(content)
    this.setState({
      comments: comments
    })
    console.log(comments)
  }
  render () {
    return (
      <div className="wrapper">
        <CommentInput onSubmit = { this.subMitHandle.bind(this) } />
        <CommentList comments = { this.state.comments }  />
      </div>
    )
  }
}

export default CommentApp