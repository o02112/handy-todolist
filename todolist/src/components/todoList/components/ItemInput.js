import React, { useState } from 'react';
import { Grid, Input, Button } from '@material-ui/core';


const ItemInput = (props) => {
  const [title, changeTitle] = useState('');

  const addItem = title => {
    title = title.trim();
    if(title === '') return;
    
    props.addItem(title);
    changeTitle('');
  }

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
