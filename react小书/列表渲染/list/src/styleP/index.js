import React from 'react'
// import ReactDOM from 'react-dom';

function getDefaultStyledPost  (defaultStyle) {
  return (props) => <p style={{...defaultStyle, ...props.style}}>
                      哈哈哈
                    </p>
}

/* */

function Index () {
  let Post = getDefaultStyledPost ({color: 'red', width: '300px'})
  return (
    <Post style={{ fontSize: '13px' }} />
  )
}


// console.log(PostDom)

export default Index