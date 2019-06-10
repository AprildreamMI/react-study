import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'

function CommentList ({ comments = [], onDeleteComment }) {
  let handleDeleteComment = function (index) {
    onDeleteComment && onDeleteComment(index)
  }
  return (
    <div>
      {
        comments.map((item, index) => {
          return <Comment comment = { item } key = {index} index={ index } 
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