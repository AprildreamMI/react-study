import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './react-redux-connect/store/index'
import Provider from './react-redux-connect/Provider'
// import App from './App';
// import Index from './react-redux/index';
import Index from './react-redux-connect/index';
// import ChangeButton from './content/index';
// import ThemeColor from './content/thmemColor';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={ store }>
    <Index />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
