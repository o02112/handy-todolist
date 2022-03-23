import { useState, useEffect, useContext, useRef } from 'react';


const useEditorHook = () => {

  const [lines, setLines] = useState([]);

  const makeElementDraggable = (ele, dragstartHandler) => {
    ele.setAttribute('draggable', 'true');
    ele.addEventListener('dragstart', dragstartHandler);
  }

  const onDragStart = (e) => {
    const dt = e.dataTransfer;
    dt.setData('text/plain', e.target.innerText.replace(/\n/, ''));
  }



  const onEditorKeyUp = (e) => {
    if(e.code === 'Enter') { // editing finished

      const textLines = [];
      const linesElements = e.target.childNodes;

      linesElements.forEach( ele => {
        const lineContent = ele.innerText.replace(/\n/, '');

        if( lineContent !== '' ) {
          textLines.push(lineContent);

          if( !ele.hasAttribute('draggable') ) {
            makeElementDraggable(ele, onDragStart);
          }
        }
      });
      
      setLines(textLines);

    }
  }

  const onBlur = (e) => {
    // e.target.removeAttribute('contenteditable');
    // console.log();

    // e.target.setAttribute('contenteditable', 'false')
  }

  const onClick = (e) => {
    // e.target.setAttribute('contenteditable', 'true');
  }


  return {
    lines,
    onBlur,
    onClick,
    onEditorKeyUp,
  }

}

export { useEditorHook }