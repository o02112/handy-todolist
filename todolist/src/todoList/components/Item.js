import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Zoom,
  Fab,
  colors,
  TextareaAutosize,
} from '@material-ui/core';
import {withStyles, useTheme} from '@material-ui/core/styles';
import {
  Done as DoneIcon,
  EditSharp as EditIcon,
  DeleteOutlineSharp as DeleteIcon,
  Refresh as RefreshIcon,
} from '@material-ui/icons';

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
    titleClick,
    onClickEditIcon,
    onClickDeleteIcon,
    onClickDoneOrRefreshIcon,
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
          rowsMin={6}
          style={{ width: '506px', padding: '5px' }} />
      )
    } else {
      return title;
    }
  }

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  const className = focusIn ? 'focused' : '';

  return (
    <ListItem selected={focusIn} onClick={titleClick} className={className}>
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
              <Fab size="small" onClick={onClickDeleteIcon}>
                <DeleteIcon/>
              </Fab>
            </Zoom>

            {
              finished
              ? null
              :(<Zoom in={focusIn} timeout={transitionDuration} unmountOnExit>
                <Fab size="small" onClick={onClickEditIcon}>
                  <EditIcon/>
                </Fab>
              </Zoom>)
            }

            <Zoom in={focusIn} timeout={transitionDuration} unmountOnExit>
              <Fab size="small" onClick={onClickDoneOrRefreshIcon}>
              {
                finished
                ? <RefreshIcon />
                : <DoneIcon/>
              }
              </Fab>
            </Zoom>
        </>)
      }

    </ListItem>)
}

export default Item;
