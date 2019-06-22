// import React from 'react';
// import ReactDOM from 'react-dom';
// 使用history_1: 引入createHistory
// import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory  } from 'history'
import createLoading from 'dva-loading';


// 引入样式 使用 bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import './style/index.css'

import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// 通过dva 的方式启动项目
// 1、引入DVA
import Dva from 'dva'
// 默认查找index首页
import router from './routers'

import model from './models'
// 注册teacher model
import teacher from './models/teacher'

// 2、创建dva的实列，APP对象
// 使用history_2: 传入Dva
const app = new Dva({
  history: createBrowserHistory()
})

// 3、配置路由app.router(fn)
app.router(router)

// 4、app.use();  // 安装插件
app.use(createLoading({
  // 创建了一个命名空间
  namespace:'myloading', //默认是loading没有啥用
}));

// 5、注册模块 app.model
app.model(model)
// 注册 teacher 模块
app.model(teacher)

// 5.5、 卸载模块 app.unmodel()

// 6、app.start('#root)  // root  就是根节点的id
app.start('#root')


// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
