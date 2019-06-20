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
