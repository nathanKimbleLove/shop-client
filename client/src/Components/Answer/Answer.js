import dateFormat, { masks } from "dateformat";
import { useState } from "react";
import axios from "axios";

function Answer({ answer, user }) {
  const [helpfulAnswerClicked, setHelpfulAnswerClicked] = useState(false);
  const [reportAnswerClicked, setReportAnswerClicked] = useState(false);
  const [reported, setReported] = useState("Report");
  const [usernameTextStyle, setUsernameTextStyle] = useState("usernameNormal");
  const [answerHelpfulness, setAnswerHelpfulness] = useState(0);
  function handleReportAnswerClick(answer) {
    console.log("in handle report answer clicked " + answer.answer_id);
    if (!reportAnswerClicked) {
      setReportAnswerClicked(true);
      axios
        .put(`http://localhost:8080/qa/answers/${answer.answer_id}/report`)
        .then((res) => {
          console.log("successfully sent put request answer reported");
          res.sendStatus(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("did not execute put request for answer reported");
    }
    // change button to "reported"
  }

  function handleHelpfulAnswerClick(answer) {
    console.log("in handle helpful answer clicked " + answer.answer_id);
    setAnswerHelpfulness(answerHelpfulness + 1);
    if (!helpfulAnswerClicked) {
      setHelpfulAnswerClicked(true);
      console.log("put request attempted for helpful answer click");
      axios
        .put(`http://localhost:8080/qa/answers/${answer.answer_id}/helpful`)
        .then((res) => {
          console.log("successfully sent put request helpful answer click");
          res.sendStatus(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("did not execute put request");
    }
  }
  console.log("helpfullness is ", answer.helpfulness);
  // if (user === answer.answerer_name) {
  //   setUsernameTextStyle("usernameBold");
  // } else {
  //   setUsernameTextStyle("usernameNormal");
  // }
  // setAnswerHelpfulness(answer.helpfulness);
  return (
    <div className="answer" key={answer.answer_id}>
      <h3 className="answerLabel">A: </h3>
      <div className="answerRightSide">
        <div>{answer.body}</div>
        <div className="answerDetails">
          by <div className={usernameTextStyle}> {answer.answerer_name}</div>,{" "}
          {dateFormat(answer.date, "mmmm dd, yyyy")} | Helpful?{" "}
          <div
            className="boldAndUnderline"
            onClick={(e) => {
              console.log("answer is ", answer);
              handleHelpfulAnswerClick(answer);
              // e.target.value = "Reported";
              // console.log("in handlehelpfulanswerclick ", e.innerText);
            }}
            onChange={(e) => console.log("there was a change")}
          >
            Yes{" "}
          </div>{" "}
          <div>{` (${answer.helpfulness + 1 * helpfulAnswerClicked}) `}</div> |{" "}
          <div
            className="boldAndUnderline"
            onClick={(e) => {
              handleReportAnswerClick(answer);
              setReported("Reported");
            }}
          >
            {reported}
          </div>
        </div>
        <div>Pictures here</div>
      </div>
    </div>
  );
}

export default Answer;
