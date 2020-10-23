import React, { Component } from 'react'

export class CommentInput extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }

  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input value={this.state.username} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea value={this.state.content} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button>
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput
