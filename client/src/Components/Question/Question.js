import { useState } from "react";
import axios from "axios";
import Highlighter from "react-highlight-words";

import prependRequests from '../../Utils/prependRequests.js';

function Question({ question, setShowModal, searchTerms }) {
  const [reportedQuestion, setReportedQuestion] = useState(false);
  const [reported, setReported] = useState("Report");
  const [markedHelpfulQuestion, setMarkedHelpfulQuestion] = useState(false);
  function handleReportQuestionClick(question_id) {
    console.log("in handle report question clicked " + question_id);
    // console.log("report question is ", reportQuestion);
    if (!reportedQuestion) {
      setReportedQuestion(true);
      axios
        .put(prependRequests() + `/qa/questions/${question_id}/report`)
        .then((res) => {
          // console.log("successfully sent put request question report");
          res.send(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // console.log("did not execute put request");
    }
  }

  function handleHelpfulQuestionClick(question_id) {
    // console.log("in handler for helpful questions question id " + question_id);
    // console.log("in handle helpful question clicked " + question_id);
    // console.log("helpful question is ", helpfulQuestion);
    if (!markedHelpfulQuestion) {
      setMarkedHelpfulQuestion(true);
      axios
        .put(prependRequests() + `/qa/questions/${question_id}/helpful`)
        .then((res) => {
          // console.log("successfully sent put helpful in handlehelpfulquestionclick");
          res.sendStatus(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // console.log("didn't let the button get clicked twice and send a put");
    }
  }

  let searchTermArray = searchTerms.split(" ");

  return (
    <div className={`questionOptions ${question.question_id}`}>
      <h3>
        Q:{" "}
        {
          <Highlighter
            className="highlighter"
            highlightClassName="YourHighLightClass"
            searchWords={searchTermArray}
            autoEscape={true}
            textToHighlight={question.question_body}
          />
        }
      </h3>
      <div className="helpAndAdd">
        <div>Helpful?</div>{" "}
        <div
          className="boldAndUnderline"
          onClick={(e) => {
            handleHelpfulQuestionClick(question.question_id);
          }}
        >
          Yes
        </div>
        {` (${question.question_helpfulness + 1 * markedHelpfulQuestion}) | `}
        <div
          className="boldAndUnderline"
          onClick={(e) => {
            handleReportQuestionClick(question.question_id);
            setReported("Reported");
          }}
        >
          {reported} Question
        </div>
        {" | "}
        <div
          className="boldAndUnderline"
          onClick={(e) => {
            // handleNewAnswerClick(question);
            setShowModal("AnswerModal", question);
          }}
        >
          Add Answer
        </div>
      </div>
    </div>
  );
}

export default Question;
