import { useEffect } from 'react';

import './Modal.css';
import Review from '../Review/Review.js';


//is passed a component to serve, and the content
// meant to be within that component

//displays that component
  //may want to create Modal versions of these
  // components to fit style

let Modal = ({ serve, content }) => {

  let components = {
    'Review': <Review review={content}/>,
  };

  let serveComponent = () => {
    return components[serve]
  }

  let exit = () => {

  }

  return (
    <>
    <div className="backdrop" ></div>
    <div className="Modal" >
      <div className="modal-topbar">
        <div></div>
        <button onClick={exit}>X</button>
      </div>
      {serve && serveComponent()}
    </div>
    </>
  )
}

export default Modal;