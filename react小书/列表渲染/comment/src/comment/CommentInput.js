import React from 'react'

class CommentInput extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      content: '',
      createdTime: +new Date()
    }
  }
  // 不依赖DOM的操作都可以放在挂载之前执行
  componentWillMount () {
    this._loadUsername()
  }
  // 页面挂载上的时候进行DOM元素的操作
  componentDidMount () {
    // 自动获取焦点
    this.textarea.focus()
  }
  // 私有方法 获取存放在localStorage中的用户名
  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username.trim()) {
      this.setState({
        username
      })
    }
  }
  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            {/* 自动聚焦到输入框 */}
            <input ref={ (textarea) => this.textarea = textarea } 
              value={ this.state.username } 
              onChange={ e => {
                this.setState({
                  username: e.target.value
                })
              } } 
              onBlur = {
                e => {
                  if (e.target.value.trim()) {
                    localStorage.setItem('username', e.target.value)
                  }
                }
              } 
            />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea 
              value={ this.state.content } 
              onChange = {
                e => {
                  this.setState({
                    content: e.target.value
                  })
                }
              }
            />
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