import React from 'react';

import { Grid } from '@material-ui/core';


const GridScreen = (props) => {
  
  return (
    <Grid container>
      <Grid item xs={4}>{props.left}</Grid>
      <Grid item xs={4}>{props.center}</Grid>
      <Grid item xs={4}>{props.right}</Grid>
    </Grid>
  )
}

export default GridScreen;