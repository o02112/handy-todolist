import React from 'react';

import {Container, ClickAwayListener} from '@material-ui/core';
import TodoItemInput from './components/ItemInput';
import TodoItemList from './components/ItemList';

import './index.css'
import {todoListContext} from './context';
import {useTodoListHook} from './hooks'

const TodoList = () => {
  const {
    addItem,
    deleteItem,
    todoListAppState,
    dispatch,
    handleClickAway,
    textEditorRef,
  } = useTodoListHook();


  return (<todoListContext.Provider value={{ dispatch, todoListAppState, textEditorRef }}>
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container maxWidth="sm" style={{
          paddingTop: 40
        }}>
        <div id="todo-app">
          <TodoItemInput addItem={addItem}/>

          <TodoItemList deleteItem={deleteItem}/>
        </div>
      </Container>
    </ClickAwayListener>
  </todoListContext.Provider>)
}

export default TodoList;
