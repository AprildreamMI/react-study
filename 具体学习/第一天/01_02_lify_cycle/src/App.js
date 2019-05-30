import React  from 'react';
import './App.css';
import Son from './Son'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      num: 12,
      name: 'zhaosi'
    }
  }
  render () {
    let header = (
                  <div>
                    头部
                  </div>
                 )
    let footer = (
                  <div>
                    底部
                  </div>
                 )
    return (
      <div>
        我是App父组件，以下使用Son组件
        <hr />
        {/* 组件的使用必须首字母大写  */}
        {/* 通过属性传递子组件数据 */}
        {/* 通过变量传递DOM */}
        <Son age={ this.state.num } name={ this.state.name }
            header={ header } footer={ footer } text={ 11 }
        >
          <ul>
            <li>haha</li>
            <li>kekeke</li>
            <li>hdwdawd</li>
          </ul>
        </Son>
      </div>
    )
  }
}

export default App;
