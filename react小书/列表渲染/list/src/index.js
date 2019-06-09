import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import List from './list'
// import CommentApp from './comment/CommentApp'
// import Percent from './percent/index'
import Post from './styleP/index'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Post />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
