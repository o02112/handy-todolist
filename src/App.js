import React from 'react';
import './App.css';

import TodoList from './todoList';
import TodoLines from './todoLines';

// import { Sortable } from '@shopify/draggable';


function App() {


  return (
    <div className="App">
      <TodoList />
      {/* <TodoLines /> */}
      
{/*
      <ul>
        <li> li 1</li>
        <li> li 2</li>
        <li> li 3</li>
        <li> li 4</li>
      </ul>
*/}
    </div>
  );
}

export default App;
