// 相当于 main.js

// 启动加载一个APP组件

// 1.引入React 对象
import React from 'react'

// 2.引入ReactDOM对象
import ReactDOM from 'react-dom'

// import App from './App'
import { App2 } from './App2'

// 4.渲染到指定元素上
ReactDOM.render(< App2 />, document.getElementById('root'))