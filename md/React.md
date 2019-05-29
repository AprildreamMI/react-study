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