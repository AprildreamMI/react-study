import React, { Component } from 'react'

class CheckList extends Component {

  redner () {
    let tasks = this.props.tasks.map((task) => {
      return (
        <li className="checklist__task">
          <input type="checkbox" defaultChecked={ task.done } />
          { task.name }
          <a href="#" className="checklist__task--remove" />
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