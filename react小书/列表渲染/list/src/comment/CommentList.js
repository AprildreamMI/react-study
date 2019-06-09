import React from 'react'
import Comment from './Comment'

function CommentList ({ comments = [] }) {
  return (
    <div>
      {
        comments.map((item, index) => {
          return <Comment comment = { item } key = {index} />
        } )
      }
    </div>
  )
}

export default CommentList