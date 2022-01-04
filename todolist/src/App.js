import React from 'react';
import './App.css';

import TodoList from './todoList';
import Modal from './todoList/components/modal';

// import { Sortable } from '@shopify/draggable';


function App() {


  return (
    <div className="App">
      
      <TodoList />

      <Modal />

    </div>
  );
}

export default App;
