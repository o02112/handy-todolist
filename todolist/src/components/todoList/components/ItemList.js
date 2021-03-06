import React from 'react';
import {List, Divider} from '@material-ui/core';

import Item from './Item';

function ItemList(props) {

  return (<List>
    {
      props.todos.map((todoItem, index) => (
        <div key={"todolist-" + index}>
          <Item todoItem={todoItem} deleteItem={props.deleteItem}/>
          <Divider/>
        </div>
      ))
    }
  </List>);
}

export default ItemList;
