import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

class Header extends React.Component {
  render () {
    return (
      <div>
        <h1>
          react 小书
        </h1>
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
