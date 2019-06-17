import React, { Component } from 'react';
import {render} from 'react-dom';
import GroceryList from './goods/GroceryList'

class App extends Component {
  render(){
    return (
      // 不能使用 
      // <React.Fragment></React.Fragment>
      <div>
        <GroceryList />
        <GroceryList />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
