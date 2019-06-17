# 讲师管理系统

## 开发流程

### 第一天

1. 初始化项目

   ```react
   create-react-app teacher_manager
   ```

2. 使用dva 引入History 和 dva

   ```react
   npm i history dva -S
   ```

3. 改造`src/index.js` 通过dva的方式启动项目

   ```react
   import React from 'react';
   import ReactDOM from 'react-dom';
   // 使用history_1: 引入createHistory
   import createHistory from 'history/createBrowserHistory'
   
   import './index.css';
   import App from './App';
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
   
   
   ReactDOM.render(<App />, document.getElementById('root'));
   
   serviceWorker.unregister();
   
   ```

4. 编写`src/router/index.js`

   ```react
   
   // 配置路由规则
   import React from 'react'
   import { Router, Route, NavLink, Switch, Redirect } from 'dva/router'
   
   const Home = () => <h1>您好</h1>
   
   // 使用history 需要先进行声明 在 src/index.js 中传入 history 【转到src/index.js查看具体步骤】
   // history 没有 # 号
   let fn = function ({ history, app }) {
     return (
       <Router history={ history }>
         <React.Fragment>
             // exact  不做嵌套路由
           <Route path="/home" exact component={ Home } />
         </React.Fragment>
       </Router>
     )
   }
   
   
   // 导出为函数
   export default fn;
   ```

5. 编写`src/model/index.js`

   ```react
   let index = {
     // 命名空间 具体命名
     namespace: 'index',
     state: {
       num: 0
     },
     effects: {
       // 异步action
       /* payload: 发来的action 中携带的数据
       select： 获取当前的state
       put: 调用reducers 
       call： 调用异步方法 */
       *changeNum ({ payload }, { select, put, call }) {
         // 保持reducers 中名字的一致性
         console.log(payload)
         yield put({ type: 'addNum', payload })
       }
     },
     reducers: {
       //  需要用 {  } 括起来
       addNum (state, { payload }) {
         // 返回一个新对象 值不可变性
         console.log(state, payload)
         return {
           num: state.num + payload.num
         }
       }
     }
   }
   
   
   export default index
   ```

6. 使用store （connect）新建`src/components/Home.js`

   ```react
   import React, { Component } from 'react'
   // 使用connect_1 引入
   import { connect } from 'dva'
   
   class Home extends Component {
     render () {
       console.log(this.props.num)
       return (
         <React.Fragment>
           <h1>
             数量：{ this.props.num }
           </h1>
           <button onClick={ e=> {
             // 带上命名空间 ，并传递payload
             this.props.dispatch({ type: 'index/changeNum', payload: { num:8 } })
           } }>
             增加number
           </button>
         </React.Fragment>
       )
     }
   }
   
   export default connect(state => {
     console.log(state)
     // 使用connect_2 声明在prop中需要使用的
     return {
       // 通过命名去state 中去取
       num: state.index.num
     }
   })(Home)
   
   ```

    

