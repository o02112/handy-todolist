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
  DeleteOutlineSharp as DeleteIcon,
  Refresh as RefreshIcon,
} from '@material-ui/icons';
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
    title,
    editing,
    focusIn,
    finished,
    focusState,
    titleClick,
    onClickEditIcon,
    onClickDeleteIcon,
    onClickDoneOrRefreshIcon,
    onUpdate,
    textEditorRef,
  } = useItemHook(props);
  const ItemTitle = () => {
    if (editing) {
      return (
        <TextareaAutosize
          ref={textEditorRef}
          autoFocus={true}
          placeholder="Edit TODO..."
          defaultValue={title}
          rowsMin={5}
          style={{ width: '516px' }}
        />)
    } else {
      return title;
    }
  }

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  return (
    <ListItem selected={focusIn} onClick={titleClick}>
      {
        finished
          ? <ListItemIcon><DoneIcon/></ListItemIcon>
          : null
      }
      {
        finished
          ? <StyledListItemText primary={<ItemTitle />}/>
          : <ListItemText primary={<ItemTitle />}/>
      }

      {
        editing
        ? null
        : (<>
          <Zoom in={focusIn} timeout={transitionDuration} unmountOnExit>
            <Fab size="small" onClick={onClickDoneOrRefreshIcon}>
              {
                finished
                ? <RefreshIcon />
                : <DoneIcon/>
              }
            </Fab>
          </Zoom>

          <Zoom in={focusIn} timeout={transitionDuration} unmountOnExit>
            <Fab size="small" onClick={onClickEditIcon}>
              <EditIcon/>
            </Fab>
          </Zoom>

          <Zoom in={focusIn} timeout={transitionDuration} unmountOnExit>
            <Fab size="small" onClick={onClickDeleteIcon}>
              <DeleteIcon/>
            </Fab>
          </Zoom>
        </>)
      }

    </ListItem>)
}

export default Item;
