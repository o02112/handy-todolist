import React from 'react';


const DragContainer = (props) => {


  const onDragStart = (e) => {
    const dt = e.dataTransfer;
    dt.setData('text/plain', props.transferData);
  }

  // const onDragEnd = (e) => {
  //   console.log('drag end.');
  // }

  
  return <div
    draggable="true"
    // onDragEnd={onDragEnd}
    onDragStart={onDragStart}
  >

    {props.children}

  </div>
}

export default DragContainer;