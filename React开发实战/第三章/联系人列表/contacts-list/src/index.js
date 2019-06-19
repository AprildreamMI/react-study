import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import ContactsApp from './contacts/ContactsApp';
import contacts from './contacts/contacts.json'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ContactsApp contacts={ contacts } />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
