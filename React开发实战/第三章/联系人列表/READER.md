# 联系人列表

## 使用 whatwg-fetch ( 用来代替window.fetch )

```react
npm i whatwg-fetch -S
```

> 需要把硬编码的数据放在JSON中，并移动到public/static 中

## 容器组件

`src/contacts/ContactsAppContainer.js`

```react
// 容器组件
import React , { Component }  from 'react'
// 导入API请求
import 'whatwg-fetch'

import ContactsApp from './ContactsApp'

class ContactsAppContainer extends Component {
  constructor () {
    super()
    this.state = {
      contacts: []
    }
  }

  componentWillMount () {
    // 在
    fetch('./contacts.json')
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData)
      this.setState({
        contacts: responseData
      })
    })
  }

  render () {
    return (
      <ContactsApp contacts={ this.state.contacts } />
    )
  }
}


export default ContactsAppContainer

```

