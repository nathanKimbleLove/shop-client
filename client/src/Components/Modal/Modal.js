import { useEffect } from 'react';

import './Modal.css';
import Review from '../Review/Review.js';
import WriteReview from '../WriteReview/WriteReview.js';


//is passed a component to serve, and the content
// meant to be within that component

//displays that component
  //may want to create Modal versions of these
  // components to fit style

let Modal = ({ serve, content, setModal }) => {

  let exit = () => {
    setModal(<></>)
  }

  let components = {
    'Review': <Review review={content}/>,
    'WriteReview': <WriteReview product={content} exit={exit}/>
  };

  let serveComponent = () => {
    return components[serve]
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