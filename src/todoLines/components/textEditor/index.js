import React from 'react';

// import  { TextareaAutosize } from '@material-ui/core';
import { useEditorHook } from './hooks';

import DragContainer from '../dragContainer';
import './index.scss';


const TextEditor = () => {

  const { onClick, onBlur, onEditorKeyUp, lines } = useEditorHook();

  console.log(lines);

  return <>
    {/*     
      <TextareaAutosize
        // ref={textareaRef}
        autoFocus={true}
        placeholder="Edit TODO..."
        // defaultValue={title}
        // onChange={e => onEditTitle(e.target.value)}
        onKeyDown={onEditorKeyUp}
        rows={25}
        style={{ width: 'calc(100%-14px)', padding: '5px' }} />
    */}


    <div>
      <div
        id="todo-lines"
        contentEditable="true"
        onKeyUp={onEditorKeyUp}
        onBlur={onBlur}
        onClick={onClick}
      />
        {/* {
          lines.map(line => {
            return (<DragContainer transferData={line}>
              
              {line}
              
              </DragContainer>)
          })
        } */}
    </div>
  </>

}

export default TextEditor;