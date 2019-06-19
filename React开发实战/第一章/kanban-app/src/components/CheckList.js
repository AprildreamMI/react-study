import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CheckList extends Component {
  // 小写
  static propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object)
  }
  render () {
    let tasks = this.props.tasks.map((task, index) => {
      return (
        <li className="checklist__task" key={ task.id }>
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
          <input type="text" className="checklist--add-task" placeholder="Type then hit Enter to add a task " />
        </ul>
      </div>
    )
  }
}


export default CheckList