import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ToodList from './ToodList'

function App() {
  // let value = {
  //   name: 'zhaosi',
  //   age: '22'
  // }
  let inputValue = 'zhaosi'
  return (
    <ToodList inputValue={ inputValue }  />
  )
}

export default App;
