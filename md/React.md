# React

 ## 导入导出

+ import 和 export 都必须放在顶级域
+ import 必须放在script代码最上面

### import 和 require

#### import

**属于加载前置**

> 属于加载前置的机制，因此将其全放在代码顶部，代码逐个解析import获取一个引入的列表，先引入依赖，再去向下执行代码

#### require

**属于加载滞后**

> 代码执行到此行才进行加载

```javascript
if (true) {
	let querStr = require('querStr')
}
```

### 全体导入

> 全体导入进来 使用 * 号， 通过  as 起一个别名

![1559141491156](assets/1559141491156.png)

## class

> 使用ES6的class关键字

```javascript
class Obj1 {
    // 静态属性
    // 其中不可能有后面生成的数据
    static staticAge = 999；
    static staticFn = function () {
        console.log(this) // 是Obj1 这个构造函数 
        console.log('静态函数')
    }；
    // 实列属性 
    // 实列可以访问静态属性 因为先有静态
   	myAge = 123;
	myFn () {
        console.log('实列的函数'， this.myAge)
    }
}

let o1 = new Obj1()

```

### 类继承

```javascript
class Person {
	age = 100;
	constructor (props) {
        this.age = props.age
        console,log('先触发父类的构造器')
    }
}

class Boy extents Person {
    name = "zhaosi"
    constructor (props) {
        this.name = props.name
        console.log('后触发子类的类构造器')
    }
}

let boy = new Boy({name: 'zhaosisi', age: 100})
```



## 使用脚手架

### 安装

任意目录全局安装

```javascript
npm i -g create-react-app
```

> 更新npm

```javascript
npm i -g npm to update
```

### 使用

+ create-react-app 项目名 options 构建项目结构
+ cd 项目目录 => npm i 安装依赖

### 运行

+ npm run start 启动
+ npm run build 生成dist

## 基本操作总结

1. 引入React对象
2. 引入ReactDOM对象
3. 操作jsx
   + 

### 组件体验

```javascript
 import React, { Component } from 'react'

class App extends Component {
  // 初始化组件自己的属性
  constructor () {
    super();
    this.state = {
      num: 1
    }
  }
  render () {
    return (
      // 保证一个根节点
      <div>
        我是react
        <hr />
        { this.state.num }
      </div>
    )
  }
}

 export default App

```

#### 双向的输入框数据绑定

##### 写法1

```javascript
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
```

##### 写法2

```javascript
import React, { Component } from 'react'

export class App2 extends Component {
  constructor () {
    super()
    this.state = {
      num: 2
    }
    // 绑定this
    this.changeHandler = this.changeHandler.bind(this)
  }
  changeHandler (e) {
    console.log(e.target.value)
    // 未作处理的情况下 this 为unfined
    console.log(this)
    this.setState({
      num: e.target.value
    })
  }
  render () {
    return (
      <div>
        <span>
          { this.state.num }
          <hr />
          {/* 在{ } 中调用的时候 其实是在顶级域中进行调用 丢死了原有的this */}
          <input type="text" value={ this.state.num } onChange={ this.changeHandler } />
        </span>
      </div>
    )
  }
}
```

![1559446716502](assets/1559446716502.png)

### 生命周期



![img](assets/5287253-82f6af8e0cc9012b.png)

```javascript
class App extends Component {
  constructor () {
    console.log('constructor 1')
    super()
    this.state = {
      num: 1
    }
  }
  // 不推荐发起网络请求 会引起渲染阻塞
  componentWillMount () {
    console.log(' 将要挂载 挂载之前 componentWillMount 2')
  }
  render () {
    console.log('render 3')
    return (
      <div>
        { this.state.num }
        <button onClick={e=>{
          this.setState({
            num: 10
          })
        }}>
          更改数据
        </button>
      </div>
    )
  }
  // 发起网络请求 可能会引起二次render
  componentDidMount () {
    /*
    	这个方法是建立任何订阅 发起网络请求的好地方
    	但应该在卸载的时候取消订阅
    */
    console.log('已经挂载 componentDidMount 4')
  }
  // 控制更新
  shouldComponentUpdate () {
    console.log('控制更新 shouldComponentUpdate')
    // 会在更新之前调用 如果返回true则进行更新 否则不进行更新
    return false
  }
  // 将要更新 更新后触发 render
  componentWillUpdate () {
    console.log('更新之前 将要更新 componentDidUpdate 更新')
  }
  // 参数：之前的属性 数据 快照
  // 更改数据之后才触发
  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log('已经更新 componentDidUpdate 更新')
  }
  // 将要卸载
  componentWillUnmount () {
    console.log(' 卸载之前 componentWillUnmount end')
  }
}

export default App;
```

### 组件传值

#### 父组件传值子组件

**父组件**

```javascript
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
            header={ header } footer={ footer }  text={ 11 }
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
```

**子组件**

> 内联样式的编写
>
> prop 属性验证

```javascript
import React from 'react'
// 引入传值约束的包
import PropTypes from 'prop-types'

class Son extends React.Component {

  // prop 属性的约定
  static propTypes = {
    text: PropTypes.string.isRequired || Number
  }

  static defaultProps = {
    text: 'abc'
  }

  constructor (props) {
    super(props)
    this.state = {
      num: 1
    }
  }
  render () {
    // 解构赋值 拿到prop中相同属性名的值
    // 声明一个name和age属性，对this.prop中的同名属性进行赋值
    let {age, name, text} = this.props
    console.log('props', this.props)
    return (
      <div>
        我是son 子组件
        <hr />
        { text }
        <hr />
        { age }, {name}
        <hr />
        {/* 传入的底部DOM 内联的样式必须放在 {} 中，然后是一个对象 使用驼峰命名 */}
        <div style={ {backgroundColor: 'red'} }>
          { this.props.header }
        </div>
        
        {/* 必须显示的在子组件中输出 才能显示在父组件中的子组件里slot中的DOM */}
        { this.props.children }

        {/* 传入的头部DOM */}
        <div style={ {backgroundColor: 'green'} }>
          { this.props.header }
        </div>
      </div>
    )
  }
}

export default Son
```

### 混合 包装

#### 包装组件

```react
import React from 'react'

class Son extends React.Component {
  constructor () {
    super()
    this.state = {
      num: 1
    }
  }
  componentDidMount () {
    console.log('son 组件原有的功能')
  }
  render () {
    return (
      <React.Fragment>
        Son 子组件
        <hr />
        { this.state.num }
      </React.Fragment>
    )
  }
}

export default class Wrap extends React.Component {
  constructor () {
    super()
    this.state = {

    }
  }
  componentDidMount () {
    console.log('包装组件中的功能')
  }
  render () {
    return <Son />
  }
}

```

#### 使用包装组件

```react
import React from 'react';
import './App.css';
import Wrap from './son'

function App() {
  return (
    <div className="App">
      <Wrap />>
    </div>
  );
}

export default App;

```

### 路由

#### 使用

##### 安装

+ npm

  ```
  // 在浏览器中使用
  npm i react-router-dom
  ```

+ yarn

  ```
  yarn add react-router-dom
  ```

##### 基本使用

```react
import React from 'react';
import './App.css';
// 专门用来给浏览器使用的
import {HashRouter, BrowserRouter as Router, Route,
NavLink, Switch, Redirect} from 'react-router-dom'

class User extends React.Component {
  componentDidMount () {
    // 获取id
    // 第一种方式获取
    console.log(this.props.match.params.id)
    console.log(this.props)
  }
  render () {
    return (
      <div>
        <h1>
          用户组件
          <button onClick={ e=> {
            this.props.history.goBack()
          } }>
            后退 前进
          </button>
        </h1>
      </div>
    )
  }
}

class Man extends React.Component {
  render () {
    return (
      <div>
        <h3>男人</h3>
      </div>
    )
  }
}

class Woman extends React.Component {
  render () {
    return (
      <div>
        <h3>女人</h3>
      </div>
    )
  }
}

class Home extends React.Component {
  render () {
    return (
      <div>
        <h1>
          我是首页
        </h1>
        <h2>以下是可变内容</h2>
        {/* 嵌套路由必须写完整路径 */}
        {/* 相同路由造成横向的重复匹配
            会同时出现 “男人”， “女人”
        */}
        <Switch>
          {/* 使用Switch 只匹配一个 */}
          <Route path="/a/man" component={ Man } />
          <Route path="/a/man" component={ Woman } />
          <Route path="/a/woman" component={ Woman } />
        </Switch>
      </div>
    )
  }
}


class App extends React.Component {
  render () {
    let  pathObj1  = {
      pathname: '/user/4',
    }

    let  pathObj2_userq  = {
      pathname: '/userq',
      search: '?id=11',
      state: {name: 'zhaosi'},
      query: {sex: '000'}
    }
    return (
      <div className="App">
        <h1> 头部 </h1>

        {/* Router 相当于规则和坑  */}
        <Router>
          {/* 因为Router 只能有一个子节点 */}
          <React.Fragment>
            <NavLink to="/a/man" activestyle={{ color: '#4dco60' }}>
              男
            </NavLink>
            <NavLink to="/a/woman" activeClassName="selected">
              女
            </NavLink>

            {/* 第一种传参方式 params 直接写路由 */}
            <NavLink to="/user/10" activeClassName="selected">
              去user 字符串传
            </NavLink>
            <NavLink to={ pathObj1 } activeClassName="selected">
              去user 对象方式穿
            </NavLink>

            {/* 第二种方式 query */}
            <NavLink to="/userq?id=1" activeClassName="selected">
              去userq 字符串传
            </NavLink>
            {/* 在this.props.location 传 */}
            <NavLink to={ pathObj2_userq } 					       activeClassName="selected">
              去userq 对象传
            </NavLink>
            <Switch>
              {/* 模糊匹配 只要以/开头的路由都会匹配到 
                  如果不加 exact(精确匹配) 路由为 “/a时”会出现两个 “首页” 
              */}
              <Route path="/" exact component={ Home } />
              {/* 需要有嵌套路由的 不能使用exact */}
              <Route path="/a" component={ Home } />

              {/* 传递参数 路由参数 传递字符串 */}
              <Route path="/user/:id" component={ User } />
            
              <Route path="/userq" component={ User } />
              <Redirect to="/" />
            </Switch>
          </React.Fragment>
        </Router>

        <h1> 底部 </h1>
      </div>
    )
  }
}

export default App;

```

+ exact

  > 精确匹配（必须精确匹配到path的字符串）
  >
  > 纵向深入匹配
  >
  > 有嵌套路由的 不能使用exact 进行精确匹配

+ switch

  > 横向匹配 选择一个
  >
  > 被包裹的<Route />
  >
  > 从上到下进行匹配

# Redux



![1559744055472](assets/1559744055472.png)

## 安装

```react
npm i redux react-redux -S
```

## 使用

1. 新建actions目录

   > 存放发出的actions 指令

2. reducers

   > 收到actions 指令 对数据进行处理 产生新的state数据

3. store

   > 存放数据和状态

4. constants

   > 因为actions 需要写一个名字
   >
   > reducers 需要匹配一个名字
   >
   > 这两个名字会在两个对方用到，重复出现的单独抽出来