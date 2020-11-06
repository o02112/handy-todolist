import React, { useCallback } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Zoom,
  Tooltip,
  Fab,
  colors,
  TextareaAutosize,
} from '@material-ui/core';
import {withStyles, useTheme} from '@material-ui/core/styles';
// import { DoneIcon } from '@material-ui/icons/Done';
import {
  Done as DoneIcon,
  EditSharp as EditIcon,
  DeleteOutlineSharp as DeleteIcon} from '@material-ui/icons';
// import ItemOptions from './ItemOptions'

import { useItemHook } from './ItemHook';

const StyledListItemText = withStyles({
  root: {
    textDecoration: 'line-through',
    color: colors.grey[300]
  }
})(ListItemText);

const Item = (props) => {
  const {
    editing,
    focusIn,
    todoItem,
    focusState,
    titleClick,
  } = useItemHook(props);
  const ItemTitle = () => {
    if (editing) {
      return (<TextareaAutosize placeholder="Edit TODO..." defaultValue={todoItem.item_title} rowsMin={5} style={{
          width: '360px'
        }} onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          console.log('click', e);
        }}/>)
    } else {
      return todoItem.item_title || ''
    }
  }

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };


  return (
    <ListItem button="button" selected={focusIn} onClick={titleClick}>
      {
        todoItem.item_finished
          ? <ListItemIcon><DoneIcon/></ListItemIcon>
          : null
      }
      {
        todoItem.item_finished
          ? <StyledListItemText primary={<ItemTitle />}/>
          : <ListItemText primary={<ItemTitle />}/>
      }
      <Zoom in={focusIn} timeout={transitionDuration} unmountOnExit>
        <Fab size="small">
          <DoneIcon/>
        </Fab>
      </Zoom>

      <Zoom in={focusIn} timeout={transitionDuration} unmountOnExit>
        <Fab size="small">
          <EditIcon/>
        </Fab>
      </Zoom>

      <Zoom in={focusIn} timeout={transitionDuration} unmountOnExit>
        <Fab size="small">
          <DeleteIcon/>
        </Fab>
      </Zoom>

    </ListItem>)
}

export default Item;
