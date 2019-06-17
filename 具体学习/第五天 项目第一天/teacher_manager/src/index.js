// import React from 'react';
// import ReactDOM from 'react-dom';
// 使用history_1: 引入createHistory
import createHistory from 'history/createBrowserHistory'

import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// 通过dva 的方式启动项目
// 1、引入DVA
import Dva from 'dva'
// 默认查找index首页
import router from './routers'
import model from './models'

// 2、创建dva的实列，APP对象
// 使用history_2: 传入Dva
const app = new Dva({
  history: createHistory()
})

// 3、配置路由app.router(fn)
app.router(router)

// 4、app.use();  // 安装插件

// 5、注册模块 app.model
app.model(model)

// 5.5、 卸载模块 app.unmodel()

// 6、app.start('#root)  // root  就是根节点的id
app.start('#root')


// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
