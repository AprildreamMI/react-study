import React from 'react'

import './logo.less'

function Logo () {
  return (
    <div className="logo-container">
      <img width="220px" height="220px" src={ require('../../assets/logo.png') } alt=""/>
    </div>
  )
}


export default Logo