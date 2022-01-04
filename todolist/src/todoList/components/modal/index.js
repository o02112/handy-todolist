import React from 'react';
import './index.scss';

const Modal = () => {

  const clickOut = () => {
    document.querySelector('#modal-container').classList.add('out');
    document.body.classList.remove('modal-active');
  }
  
  return (<>
    <button
    onClick={() => {
      let container = document.querySelector('#modal-container');

        container.classList.remove('out');
        container.classList.add('active');
        
        document.body.classList.add('modal-active');
      }}
    >click</button>
    <div id="modal-container" onClick={clickOut}>
      <div className="modal-background">
        <div className="modal">
          <h2>I'm a Modal</h2>
          <p>Hear me roar.</p>
        </div>
      </div>
    </div>
  </>
  )
  
}

export default Modal;