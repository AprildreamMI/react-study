# kanban-app

1. `src/components/KanbanBoard.js`

   > 新建

   ```react
   import React, { Component } from 'react'
   import List from './List'
   
   
   class KanbanBoard extends Component {
     static propTypes = {
       cards: PropTypes.arrayOf(PropTypes.object).isRequired
     }
     render () {
       console.log(this.props.cards)
       return (
         <div className="app">
           <List id="todo" title="To Do" cards={ this.props.cards.filter( (card) => card.status === 'todo' ) } />
           <List id="in-progress" title="In Pro" cards={ this.props.cards.filter( (card) => card.status === 'in-progress' ) } />
           <List id="done" title="Done" cards={ this.props.cards.filter( (card) => card.status === 'done' ) } />
         </div>
       )
     }
   }
   
   export default KanbanBoard
   ```

2. `src/components/List.js`

   > 列表渲染 使用key

   ```react
   import React, { Component } from 'react'
   import Card from './Card.js'
   
   class List extends Component {
     render () {
       let cards = this.props.cards.map( (card) => {
         return <Card id={ card.id } title={ card.title } description={ card.description } color={ card.color } tasks={ card.tasks } key={ card.id } />
       } )
       return (
         <div className="list">
           <h1>
             { this.props.title }
           </h1>
           { cards }
         </div>
       )
     }
   }
   
   
   export default List
   ```

3. `src/components/Card.js`

   ```react
   import React, { Component } from 'react'
   import PropTypes from 'prop-types'
   // 使用Markdown
   import marked from 'marked'
   
   import CheckList from './CheckList'
   
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
       // 自定义的校验
       title: titlePropType,
       description: PropTypes.string,
       color: PropTypes.string,
       tasks: PropTypes.arrayOf(PropTypes.object)
     }
     constructor () {
       super()
       this.state = {
         showDetails: false
       }
     }
     render () {
       let cardDetails
       if (this.state.showDetails) {
         cardDetails = (
           <div className="card__details">
             {/* html 渲染 xss */}
             <span dangerouslySetInnerHTML={ {
               __html: marked(this.props.description)
             } } />
             <CheckList cardId={ this.props.id } tasks={ this.props.tasks } />
           </div>
         )
       }
   
       let sideColor = {
         position: 'absolute',
         zIndex: -1,
         top: 0,
         bottom: 0,
         left: 0,
         width: 7,
         backgroundColor: this.props.color
       }
   
       return (
         <div className="card">
           <div style={ sideColor } />
           <div className={ this.state.showDetails? "card__title card__title--is-open" : "card__title" } onClick={ () => {
             this.setState({
               showDetails: !this.state.showDetails
             })
           } }>
             { this.props.title }
           </div>
           { cardDetails }
         </div>
       )
     }
   }
   
   export default Card
   ```

4. `src/components/CheckList.js`

   ```react
   import React, { Component } from 'react'
   import CheckList from './CheckList'
   
   class Card extends Component {
   
     render () {
       return (
         <div className="card">
           <div className="card__title">
             { this.props.title }
           </div>
           <div className="card__details">
             { this.props.description }
             <CheckList cardId={ this.props.id } tasks={ this.props.tasks } />
           </div>
         </div>
       )
     }
   }
   
   export default Card
   ```

5. `src/components/CheckList.js`

   > 列表渲染

   ```react
   import React, { Component } from 'react'
   
   class CheckList extends Component {
     render () {
       let tasks = this.props.tasks.map((task, index) => {
         return (
           <li className="checklist__task" key={ index }>
             <input type="checkbox" defaultChecked={ task.done } />
             { task.name }
             <i className="checklist__task--remove" />
           </li>
         )
       })
       return (
         <div className="checklist">
           <ul>
             { tasks }
           </ul>
         </div>
       )
     }
   }
   
   
   export default CheckList
   ```

   

## 使用whatwg-fetch 获取服务器数据

`src/components/KanbanBoardContainer.js` 容器组件

```react
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
```

