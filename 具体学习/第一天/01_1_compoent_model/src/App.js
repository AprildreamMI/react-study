/* import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */


import React, { Component } from 'react'

class App extends Component {
  // 初始化组件自己的属性
  constructor () {
    super();
    this.state = {
      num: 1
    }
  }
  changeHandler (e) {
    console.log(e.target.value)
    this.setState({
      num: e.target.value
    })
  }
  render () {
    return (
      // 保证一个根节点
      <div>
        我是react
        <hr />
        { this.state.num }
        <hr/>
        <input value={ this.state.num } onChange={ (e)=>{
          this.changeHandler(e)
        } } />
      </div>
    )
  }
}

 export default App
