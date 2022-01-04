import React from 'react';
import { Grid, Input, Button } from '@material-ui/core';
import { useItemInputHook } from './ItemInputHook';


const ItemInput = (props) => {
  const {
    title,
    addItem,
    focusIn,
    changeTitle,
    getInputRef,
    // iRef,
  } = useItemInputHook(props);

  return (
    <Grid container>
      <Grid item xs={10}>
        <Input
          value={title}
          onChange={e => changeTitle(e.target.value)}
          onKeyPress={e => {
            if(e.key === 'Enter') { addItem(title) }
          }}
          autoFocus={true}
          fullWidth={true}
          placeholder="TODO..."
          inputProps={{ 'aria-label': 'TODO...' }}
          onFocus={() => focusIn()}
          // inputRef={iRef}
        />
      </Grid>

      <Grid item xs={2}>
        <Button
          style={{width: '100%'}}
          variant="contained"
          color="primary"
          size="small"
          onClick={() => addItem(title)}
          >Add</Button>
      </Grid>
    </Grid>
  );
}

export default ItemInput;
