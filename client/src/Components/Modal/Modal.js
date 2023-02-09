import { useEffect } from "react";
import AnswerModal from "../AnswerModal/AnswerModal";
import QuestionModal from "../QuestionModal/QuestionModal";

import "./Modal.scss";
import Review from "../Review/Review.js";
import WriteReview from "../WriteReview/WriteReview.js";

//is passed a component to serve, and the content
// meant to be within that component

//displays that component
//may want to create Modal versions of these
// components to fit style

let Modal = ({ serve, content, setModal, globalProduct, setUser }) => {
  let exit = () => {
    setModal(<></>);
  };

  let components = {
    Review: <Review review={content} />,
    WriteReview: <WriteReview product={content} exit={exit} />,
    AnswerModal: (
      <AnswerModal question={content} exit={exit} product={globalProduct} setUser={setUser} />
    ),
    QuestionModal: <QuestionModal product={content} exit={exit} setUser={setUser} />
  };

  let serveComponent = () => {
    return components[serve];
  };

  return (
    <>
      <div className="backdrop"></div>
      <div className="Modal">
        <div className="modal-topbar">
          <div></div>
          <button onClick={exit}>X</button>
        </div>
        {serve && serveComponent()}
      </div>
    </>
  );
};

export default Modal;
