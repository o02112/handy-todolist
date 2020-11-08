import React from 'react';

import {Container, ClickAwayListener} from '@material-ui/core';
import TodoItemInput from './components/ItemInput';
import TodoItemList from './components/ItemList';

import './index.css'
import {todoListContext} from './context';
import {useTodoListHook} from './hooks'

const TodoList = () => {
  const {
    todos,
    addItem,
    deleteItem,
    itemState,
    dispatch,
    handleClickAway,
    textEditorRef,
  } = useTodoListHook();


  return (<todoListContext.Provider value={{ dispatch, itemState, textEditorRef }}>
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container maxWidth="sm" style={{
          paddingTop: 40
        }}>
        <TodoItemInput addItem={addItem}/>

        <TodoItemList todos={todos} deleteItem={deleteItem}/>
      </Container>
    </ClickAwayListener>
  </todoListContext.Provider>)
}

export default TodoList;
