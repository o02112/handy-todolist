import React from 'react';
import TextEditor from './components/textEditor';
import GridScreen from './components/gridScreen';
import DropArea from './components/dropArea';

const TodoLines = () => {
  return (<>
  
    <GridScreen
      left={<DropArea />}
      center={<TextEditor />}
      right={<DropArea />}
    />  
    
  </>)
}


export default TodoLines;