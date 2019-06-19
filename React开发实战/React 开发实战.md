# React 开发实战

## 内联样式 自动追加正确的单位

```react
import React, { Component } from 'react'

class StyleSpan extends Component {
  // 可以自动追加正确的单位
  render () {
    let divStyle = {
      width: 100,
      height: 30,
      padding: 5,
      backgroundColor: '#ee9900'
    }

    return (
      <div style={ divStyle }>
        Hello World
      </div>
    )
  }
}


export default StyleSpan
```

![1560842844085](../React%E5%BC%80%E5%8F%91%E5%AE%9E%E6%88%98/%E7%AC%AC%E4%B8%80%E7%AB%A0/kanban-app/assets/1560842844085.png)

## 受控组件和非受控组件

- 受控组件

  ```react
  // 受控组件 值由react 控制
  // 通过handelChangeInput 来更新组件
  < input type="search" value={ this.state.searchTerm } onChange={ e => {
      this.handelChangeInput(e)
    } } />
  ```

- 非受控组

  > 不为react 控制的组件

  ```react
  import React, { Component } from 'react'
  
  class Uncontrolled extends Component {
    constructor () {
      super()
      this.state = {
        name: '赵思',
        email: 'magicwingzs@qq.com'
      }
    }
    handelSubmit (e) {
      e.preventDefault()
      console.dir(e.target.name.value)
      console.dir(e.target.Email.value)
    }
    handelChangeInput (e) {
      console.log(e.target.value)
    }
    render () {
      return (
        <form onSubmit={ this.handelSubmit.bind(this) }>
          <div>
            {/* 通过defaultValue 来设置默认值 */}
            Name: <input name="name" type="text" defaultValue={ this.state.name } onChange={ e => this.handelChangeInput(e) } />
          </div>
          <div>
            Email: <input name="Email" type="email" defaultValue={ this.state.email } />
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
      )
    }
  }
  
  
  export default Uncontrolled
  ```

  

## 自定义propTypes 校验器

```react
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 自定义的校验器
let titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName]
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(
        `${propName} in ${componentName} is longer then 80 characters`
      )
    }
  }
}


class Card extends Component {
  static propTypes = {
    id: PropTypes.number,
    // 使用自定义的校验
    title: titlePropType,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object)
  }
  constructor () {
    super()
    this.state = {
    }
  }
  render () {
    return (
      <div className="card">
      </div>
    )
  }
}

export default Card
```

>  验证失败时![1560928986517](assets/1560928986517.png) 

