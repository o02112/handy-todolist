import React from 'react';
import './index.scss';

const DropArea = () => {

  const onDrop = (e) => {
    const data = e.dataTransfer.getData('text/plain'); console.log(data);
    e.target.textContent = data;
    e.preventDefault();
  }
  
  return <div
    className="drop-area"
    // return false to stop drop event
    // e.preventDefault() to accept drop event
    // use e.dataTransfer.types(array) to get data type to validate data, which was set in the onDragStart event
    onDragOver={e => e.preventDefault()}
    onDrop={onDrop}
  >
    <br /> drop area
  </div>
}

export default DropArea;