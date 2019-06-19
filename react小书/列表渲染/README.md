# 评论列表

1. `src/comment/CommentApp.js`

   ```react
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
     // 向List 中传递此函数 获取需要删除的index
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
           // 向下传递删除方法
           <CommentList onDeleteComment={ this.handleDeleteComment.bind(this) } comments = { this.state.comments }  />
         </div>
       )
     }
   }
   
   export default CommentApp
   ```

2. `src/comment/CommentInput.js`

   ```react
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
   ```

3. `src/comment/CommentList.js`

   ```react
   import React from 'react'
   import PropTypes from 'prop-types'
   import Comment from './Comment'
   
   function CommentList ({ comments = [], onDeleteComment }) {
     // 调用父组件传递下来的删除方法
     let handleDeleteComment = function (index) {
       onDeleteComment && onDeleteComment(index)
     }
     return (
       <div>
         {
           comments.map((item, index) => {
             return <Comment comment = { item } key = {index} index={ index } 
                      // 向下传递删除方法
                     onDeleteComment={ handleDeleteComment } />
           } )
         }
       </div>
     )
   }
   
   CommentList.propTypes  = {
     comments: PropTypes.array.isRequired,
     onDeleteComment: PropTypes.func.isRequired
   }
   
   export default CommentList
   ```

4. `src/comment/Comment.js`

   ```react
   import React, { Component } from 'react'
   import PropTypes from 'prop-types'
   
   class Comment extends Component {
     static propTypes = {
       comment: PropTypes.object.isRequired,
       index: PropTypes.number.isRequired,
       onDeleteComment: PropTypes.func.isRequired
     }
     constructor () {
       super()
       this.state = {
         timeString: ''
       }
     }
     componentWillMount () {
       this._updateTimeString()
       this._timer = setInterval(this._updateTimeString.bind(this), 5000)
     }
     componentWillUnmount () {
       clearInterval(this._timer)
       this._timer = null
     }
   	// 多少秒前
     _updateTimeString () {
       const { comment } = this.props
       const duration = (+Date.now() - comment.createdTime) / 1000
       this.setState({
         timeString: duration > 60 ? `${Math.round(duration / 60)} 分钟前` : `${Math.round(Math.max(duration, 1))}秒前`
       })
     }
   	// 渲染 HTML 防止注入
     _getProcessedContent (content) {
       return content
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;")
         .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
     }
   	//  调用父组件传下来的删除方法 传入数据
     handleDeleteComment () {
       this.props.onDeleteComment && 			     this.props.onDeleteComment(this.props.index)
     }
     render () {
       return (
         <div className='comment'>
           <div className='comment-user'>
             <span>{this.props.comment.username} </span>：
           </div>
           <p dangerouslySetInnerHTML={{
             __html: this._getProcessedContent(this.props.comment.content)
           }}>
           </p>
           <span className='comment-createdtime'>
             {this.state.timeString}
           </span>
           <span className='comment-delete' onClick={ this.handleDeleteComment.bind(this) }>
             删除
           </span>
         </div>
       )
     }
   }
   
   export default Comment
   ```

   