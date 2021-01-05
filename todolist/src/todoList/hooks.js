import {useState, useEffect, useReducer } from 'react';
import dataStorage from './dataStorage/index';
import { SET_TODOS, FOCUS_OUT } from './actionTypes';
import Reducer from './reducer';
const {
  queryListItem,
  queryAddItem,
  queryDeleteItem,
} = dataStorage

export const useTodoListHook = () => {

  const initState = {
    todos: [], // todo 数据列表
    itemsStates: {}, // todo项的状态，如 { <item_id>: { editing: false, focusing: true, .. }, <item_id2>: {...} }
  }
  const [todoListAppState, dispatch] = useReducer(Reducer, initState);

  useEffect(() => {
    queryTodoList();
  }, []);

  const queryTodoList = () => {
    queryListItem().then((response = {}) => { console.log(response);
      dispatch({
        type: SET_TODOS,
        payload: {
          todos: response.data || [],
        }
      });
    })
  }
  const addItem = title => {
    queryAddItem(title)
      .then((response = {}) => {
        if (response.data.rowCount) {
          queryTodoList();
        }
    })
  }
  const deleteItem = itemId => {
    queryDeleteItem(itemId)
      .then((response = {}) => {
        if(response.data.rowCount) {
          queryTodoList();
        }
      })
  }

  const handleClickAway = () => {
    dispatch({ type: FOCUS_OUT });
  }

  return {
    addItem,
    deleteItem,
    handleClickAway,
    todoListAppState,
    dispatch,
  }
}
