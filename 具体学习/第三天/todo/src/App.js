import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import './todo.css'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      curretTodoName: '',
      currendEditId: '',
      todos: [
        {
          id: 1,
          name: '吃饭饭',
          check: false
        },
        {
          id: 2,
          name: '睡觉觉',
          check: true
        },
        {
          id: 3,
          name: '打豆豆',
          check: false
        },
      ]
    }
  }
  // 渲染任务列表
  renderTodos () {
    return this.state.todos.map( item => {
      return (
        <li className={ [item.check ? 'completed' : null, this.state.currendEditId === item.id ? 'editing' : null].join(' ') } key={ item.id }>
            <div className="view">
                <input className="toggle" type="checkbox" checked={ item.check } 
                  onChange={ e => this.changeCheckBox(e, item) } />
                <label onDoubleClick={ e => this.setCurrentEditId(e, item) } >{ item.name }</label>
                <button className="destroy" onClick={ e => this.removeTodo(item.id) }></button>
            </div>
            <input className="edit" value="Create a TodoMVC template" />
        </li>
      )
    })
  }
  // 赋值当前任务标题
  setCurrentName (e) {
    this.setState({
      curretTodoName: e.target.value
    })
  }
  // 添加任务
  addTodo (e) {
    e.preventDefault()
    console.log('1')
    if (this.state.curretTodoName.trim() === '') {
      return false
    }
    let minId = -1
    this.state.todos.forEach(item => {
      if (item.id > minId) {
        minId = item.id
      }
    })
    minId++
    this.state.todos.push({
      id: minId,
      name: this.state.curretTodoName,
      check: false
    })
    // 更新视图层
    this.setState({})
  }
  // 删除任务
  removeTodo (id) {
    let todoIndex = this.state.todos.findIndex( item => {
      return item.id === id
    })
    this.state.todos.splice(todoIndex, 1)
    this.setState({})
  }
  // 改变ckechbox
  changeCheckBox (e, todo) {
    let { todos } = this.state
    let todoIndex = this.state.todos.findIndex( item => {
      return item.id === todo.id
    })
    todos[todoIndex].check = e.target.checked
    this.setState({})
  }
  // 设置当前编辑的任务
  setCurrentEditId (e, todo) {
    this.setState({
      currendEditId: todo.id
    })
  }
  render () {
    return (
      <React.Fragment>
        <section className="todoapp">
          <header className="header">
              <h1>todos</h1>
              <form onSubmit={ e=> this.addTodo(e) }>
                <input className="new-todo" value={ this.state.curretTodoName } onChange={ e=> this.setCurrentName(e) }  placeholder="What needs to be done?" autoFocus />
              </form>
          </header>
          {/* This section should be hidden by default and shown when there are todos */}
          <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              { this.renderTodos() }
            </ul>
          </section>
          {/* This footer should hidden by default and shown when there are todos */}
          <footer className="footer">
              {/* This should be `0 items left` by default */}
              <span className="todo-count"><strong>0</strong> item left</span>
              {/* Remove this if you don't implement routing */}
              <ul className="filters">
                  <li>
                      <a className="selected" href="#/">All</a>
                  </li>
                  <li>
                      <a href="#/active">Active</a>
                  </li>
                  <li>
                      <a href="#/completed">Completed</a>
                  </li>
              </ul>
              {/*Hidden if no completed items are left ↓ */}
              <button className="clear-completed">Clear completed</button>
          </footer>
        </section>
        <footer className="info">
            <p>Double-click to edit a todo</p>
            {/* Remove the below line ↓ */}
            <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
            {/* Change this out with your name and url ↓ */}
            <p>Created by <a href="http://todomvc.com">you</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </React.Fragment>
    )
  }
  
}

export default App;
