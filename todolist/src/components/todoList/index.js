import React, { useCallback } from 'react';

import {Container, ClickAwayListener} from '@material-ui/core';
import TodoItemInput from './components/ItemInput';
import TodoItemList from './components/ItemList';
// import { todos, setTodos, handleClickAway } from './hooks'

import {todoListContext} from './context';
import {useTodoListHook} from './hooks'

const TodoList = () => {
  const {
    todos,
    // setTodos,
    addItem,
    deleteItem,
    itemState,
    dispatch,
    handleClickAway,
  } = useTodoListHook();


  return (<todoListContext.Provider value={{ dispatch, itemState }}>
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
