import React,  {useState, useContext, useRef } from 'react';
import {todoListContext} from '../context';
import { FOCUS_OUT } from '../actionTypes';


export const useItemInputHook = (props) => {
  const [title, changeTitle] = useState('');
  const { dispatch } = useContext(todoListContext);
  // const iRef = useRef();


  const addItem = title => {
    title = title.trim();
    if(title === '') return;
    
    props.addItem(title);
    changeTitle('');
  }


  const focusIn = () => {
    dispatch({ type: FOCUS_OUT });

  }


  return {
    title,
    addItem,
    focusIn,
    changeTitle,
    // iRef,
  }
}

