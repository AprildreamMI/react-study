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

