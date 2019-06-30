import React, { Component } from 'react'
import { Button, Input, List } from 'antd'
import './ToodList.scss'
import store from './store'


class ToodList extends Component {
  constructor () {
    super()
    // 获取store 赋值给store
    this.state = store.getState()
    this.handleStoreChange = this.handleStoreChange.bind(this)
    // 订阅store 当store发生改变后，执行handleStoreChange
    store.subscribe(this.handleStoreChange)
  }
  // 输入框值发生改变
  handleValueChange (e) {
    store.dispatch({
      type: 'change_input_value',
      inputValue: e.target.value
    })
  }
  // 向列表中添加项目
  handleAddList () {
    store.dispatch({
      type: 'add_item',
      inputValue: this.state.inputValue
    })
  }
  // 删除列表中的项 传递index
  handleDeleteItem (index) {
    store.dispatch({
      type: 'delete_item',
      index
    })
  }
  // 当store发生变化时
  handleStoreChange () {
    console.log('store change')
    // 同步数据
    this.setState(store.getState())
  }
  render () {
    return (
      <div className="ToodList aa">
        <Input style={{ width: 240, marginRight: 20 }} 
               value={ this.state.inputValue }
               onChange={ e=> this.handleValueChange(e) }
        />
        <Button type="primary" onClick={ e=> this.handleAddList() }>添加</Button>
        <List
          style={{ width: 240, marginTop: 20 }}
          size="small"
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => 
            <List.Item onClick={ e=> this.handleDeleteItem(index) }>{item}</List.Item>
          } 
        />
      </div>
    )
  }
}

export default ToodList