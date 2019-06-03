import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

class Title extends React.Component {
  render () {
    return (
      <h1>
        React 小书标题
      </h1>
    )
  }
}

class Header extends React.Component {
  render () {
    let workKey = '我是表达式插入的(换不换行都不影响我)'
    const isGoodWord = true
    const goodWord = <span>JSX中元素就是对象我被赋值给了goodWord{ workKey }</span>
    const badWord = <span>JSX中元素就是对象我被赋值给了badWord</span>
    return (
      <div>
        <h1>
          react 小书
          { workKey }
        </h1>
        <hr />
        <h1 title={ isGoodWord? 'zhen' : '假' }>
          我还可以执行方法<br />
          {
            (()=> {
              return '我是表达式插入中所执行方法的返回值'
            })()
          }
        </h1>
        <hr />
        {
          isGoodWord ? <span>在条件渲染中我是真的返回</span> : <span>在条件渲染中我是假的返回</span>
        }
        <hr />
        {
          isGoodWord ? goodWord : badWord
        }
        <hr />
        <h2>
          使用标题
        </h2>
        <Title />
      </div>
    )
  }
}

// 把React 组件渲染到页面
ReactDOM.render(
  <Header />, 
  document.getElementById('root')
);
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
