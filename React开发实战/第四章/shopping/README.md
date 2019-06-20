# 购物车列表 (动画)

## 使用ReactCSSTransitionGroup

```react
npm i react-addons-css-transition-group
```

`src/shop/index.js`

```react
import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './shop.css'

class AnimateShoppingList extends Component {
  constructor () {
    super()
    this.state = {
      items: [
        {
          id: 1,
          name: 'Milk'
        },
        {
          id: 2,
          name: 'Yogurt'
        },
        {
          id: 3,
          name: 'Orange Juice'
        }
      ]
    }
  }

  // 添加条目
  handleChange (evt) {
    if (evt.key === 'Enter') {
      let newItem = {
        id: Date.now(),
        name: evt.target.value
      }

      let newItems = this.state.items.concat(newItem)

      this.setState({
        items: newItems
      })
    }
  }

  // 删除条目
  handleRemove (index) {
    let { items } = this.state
    items.splice(index, 1)
    this.setState({
      items: items
    })
  }

  render () {
    let shoppingItems = this.state.items.map((item, i) => {
      return (
        <div key={ item.id } className="item"
          onClick={ this.handleRemove.bind(this, i) }
        >
          { item.name }
        </div>
      )
    })
    return (
      <div>
        {/* 
          // 映射到CSS中包含实际动画定义的类名
          transitionName="example"
          // 动画持续的时间
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 300 }

          // 【可选】  用于在组件初始挂在时执行一个额外的过渡阶段
          transitionAppear={ true }
          transitionAppearTimeout={ 300 }
        */}
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 300 }
          transitionAppear={ true }
          transitionAppearTimeout={ 300 }
        >
          { shoppingItems }
        </ReactCSSTransitionGroup>
        <input type="text" value={ this.state.newItem } 
          onKeyDown={ this.handleChange.bind(this) }
        />
      </div>
    )
  }
}

export default AnimateShoppingList
```

`src/shop/shop.css`

```css
input {
  padding: 5px;
  width: 120px;
  margin-top: 10px;
}

.item {
  background-color: #efefef;
  cursor: pointer;
  display: block;
  margin-bottom: 1px;
  padding: 0 12px;
  width: 120px;
}

/* 进入之前 */
.example-enter {
  opacity: 0;
  transform: translateX(-250px);
}
/* 进入时 */
.example-enter.example-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: 0.3s;
}

/* 离开之前 */
.example-leave {
  opacity: 1;
  transform: translateX(0);
}
/* 离开时 */
.example-leave.example-leave-active {
  opacity: 0;
  transform: translateX(250px);
  transition: 0.3s;
}

.example-appear {
  opacity: 0;
  transform: translateX(-250px);
}
.example-appear.example-appear-active {
  opacity: 1;
  transform: translateX(0);
  transition: 0.5s;
}
```

