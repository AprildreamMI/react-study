import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// 非受控组件
// import Uncontrolled from './components/test/Uncontrolled'
import KanbanBoard from './components/KanbanBoard'
import * as serviceWorker from './serviceWorker';

import cards from './utils/cardsList.json'


// ReactDOM.render(<Uncontrolled cards={ cards } />, document.getElementById('root'));
ReactDOM.render(<KanbanBoard cards={ cards } />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
