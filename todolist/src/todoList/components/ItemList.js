import React, { useContext } from 'react';
import {List, Divider} from '@material-ui/core';

import {todoListContext} from '../context';
import Item from './Item';

function ItemList(props) {
  const {dispatch, todoListAppState} = useContext(todoListContext)


  return (<List id="todolist">
    {
      todoListAppState.todos.map((todoItem, index) => (
        <div key={"todolist-" + index}>
          <Item todoItem={todoItem} deleteItem={props.deleteItem}/>
          <Divider/>
        </div>
      ))
    }
  </List>);
}

export default ItemList;
