import React, { Component } from 'react'
import 'whatwg-fetch'
import update from 'react-addons-update'

import KanbanBoard from './KanbanBoard'


const API_URL = 'http://kanbanapi.pro-react.com/'
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'magicwingzs@gmail'
}

class KanbanBoardContainer extends Component {
  constructor () {
    super()
    this.state = {
      cards: []
    }
  }

  componentWillMount () {
    fetch(`${API_URL}/cards`,{
      headers: API_HEADERS
    })
    .then((response) => response.json())
    .then((responseData) =>{
      this.setState({
        cards: responseData
      })
    })
    .catch(error => console.log('获取数据出错'))
  }

  // 添加任务
  addTask (cardId, taskName) {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId)
    
    let newTask = {
      id: Date.now(),
      name: taskName,
      done: false
    }

    let newCards = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          $push: [newTask]
        }
      }
    })

    this.setState({
      cards: newCards
    })

    fetch(`${API_URL}/cards/${cardId}/tasks`,{
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response) => response.json())
    .then((responseData) =>{
      newTask.id = responseData.id
      this.setState({
        cards: newCards
      })
    })
    .catch(error => new Error('添加任务出错'))
  }

  // 删除任务
  deleteTask (cardId, taskId, taskIndex) {
    console.log(...arguments)
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId)
    let newCards = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $splice: [[taskIndex, 1]] }
      }
    })
    this.setState({
      cards: newCards
    })

    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    })
  }

  // 切换任务状态
  toggleTask (cardId, taskId, taskIndex) {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId)
    let newDonValue
    let newCards = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {
              $apply: (done) => {
                newDonValue = !done
                return newDonValue
              }
            }
          }
        }
      }
    })

    this.setState({
      cards: newCards
    })

    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({
        done: newDonValue
      })
    })
  }


  render () {
    return (
      <KanbanBoard cards={ this.state.cards } taskCallbacks={{
        add: this.addTask.bind(this),
        delete: this.deleteTask.bind(this),
        toggle: this.toggleTask.bind(this)
      }} />
    )
  }
}


export default KanbanBoardContainer