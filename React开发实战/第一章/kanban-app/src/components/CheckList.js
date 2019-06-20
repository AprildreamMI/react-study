import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CheckList extends Component {
  // 小写
  static propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.objectOf(PropTypes.func).isRequired
  }

  // 键盘事件
  checkInputKeyPress (evt) {
    if (evt.key === 'Enter') {
      this.props.taskCallbacks.add(this.props.cardId, evt.target.value)
      evt.target.value = ''
    }
  }

  render () {
    let tasks = this.props.tasks.map((task, index) => {
      return (
        <li className="checklist__task" key={ task.id }>
          <input type="checkbox" checked={ task.done }
            // 调用传递下来的函数
            onChange={ this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, index) } 
          />
          { task.name }
          {/* 删除任务 */}
          <i className="checklist__task--remove"
            onClick={ this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, index) } 
          />
        </li>
      )
    })
    return (
      <div className="checklist">
        <ul>
          { tasks }
          {/* 添加任务 */}
          <input type="text" className="checklist--add-task" placeholder="Type then hit Enter to add a task " 
            onKeyPress={ this.checkInputKeyPress.bind(this) }
          />
        </ul>
      </div>
    )
  }
}


export default CheckList