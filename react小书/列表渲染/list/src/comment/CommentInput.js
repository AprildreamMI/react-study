import React from 'react'

class CommentInput extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }
  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input value={ this.state.username } onChange={ e => {
              this.setState({
                username: e.target.value
              })
            } } />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea value={ this.state.content } onChange = {
              e => {
                this.setState({
                  content: e.target.value
                })
              }
            } />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick = {
            e => {
              this.props.onSubmit && this.props.onSubmit(this.state)
            }
          }>
            发布
          </button>
        </div>
    </div>
    )
  }
}

export default CommentInput