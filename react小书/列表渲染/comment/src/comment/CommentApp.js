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
  componentWillMount () {
    this._loadComments()
  }
  // 获取
  _loadComments () {
    let comments = localStorage.getItem('comments')
    if (comments) {
      comments = JSON.parse(comments)
      this.setState({
        comments
      })
    }
  }
  // 存放在 localStorage
  _saveComments (comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }
  // 向List 中传递此函数
  handleDeleteComment (index) {
    const { comments } = this.state
    comments.splice(index, 1)
    this.setState({
      comments
    })
    this._saveComments(comments)
  }
  subMitHandle (comment) {
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    let { comments } = this.state
    comments.push(comment)
    this.setState({
      comments: comments
    })
    // 持久化保存
    this._saveComments(comments)
  }
  render () {
    return (
      <div className="wrapper">
        <CommentInput onSubmit = { this.subMitHandle.bind(this) } />
        <CommentList onDeleteComment={ this.handleDeleteComment.bind(this) } comments = { this.state.comments }  />
      </div>
    )
  }
}

export default CommentApp