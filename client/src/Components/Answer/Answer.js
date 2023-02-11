import dateFormat from "dateformat";
import { useState, useEffect } from "react";
import axios from "axios";
// import handleFullScreen from "../../Utils/handleFullScreen";
import "./Answer.scss";
import AnswerImage from "../AnswerImage/AnswerImage";

import prependRequests from "../../Utils/prependRequests.js";

function Answer({ answer, user, question }) {
  const [helpfulAnswerClicked, setHelpfulAnswerClicked] = useState(false);
  const [reportAnswerClicked, setReportAnswerClicked] = useState(false);
  const [reportedAnswer, setReportedAnswer] = useState("Report");
  const [usernameTextStyle, setUsernameTextStyle] = useState("usernameNormal");
  const [answerHelpfulness, setAnswerHelpfulness] = useState(0);
  const [photos, setPhotos] = useState([[]]);

  function handleReportAnswerClick(answer) {
    if (!reportAnswerClicked) {
      setReportAnswerClicked(true);
      axios
        .put(prependRequests() + `/qa/answers/${answer.answer_id}/report`)
        .then((res) => {
          res.sendStatus(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  }

  function handleHelpfulAnswerClick(answer) {
    setAnswerHelpfulness(answerHelpfulness + 1);
    if (!helpfulAnswerClicked) {
      setHelpfulAnswerClicked(true);
      axios
        .put(prependRequests() + `/qa/answers/${answer.answer_id}/helpful`)
        .then((res) => {
          res.sendStatus(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  }

  useEffect(() => {
    if (answer.photos[0]) {
      setPhotos(answer.photos);
    }
    if (user === answer.answerer_name) {
      setUsernameTextStyle("usernameBold");
    }
  }, [answer, user]);

  return (
    <div className={`answer ${answer.answer_id}`}>
      <h3 className="answerLabel">A: </h3>
      <div className="answerRightSide">
        <div>{answer.body}</div>
        <div className="answerPhotos">
          {photos.map((element, index) => {
            return <AnswerImage key={element.id + element.url} index={index} url={element.url} />;
          })}{" "}
        </div>
        <div className="answerDetails">
          by <div className={usernameTextStyle}> {answer.answerer_name}</div>,{" "}
          {dateFormat(answer.date, "mmmm dd, yyyy")} | Helpful?{" "}
          <div
            className="boldAndUnderline"
            onClick={(e) => {
              handleHelpfulAnswerClick(answer);
            }}
          >
            Yes{" "}
          </div>{" "}
          <div>{` (${answer.helpfulness + 1 * helpfulAnswerClicked}) `}</div> |{" "}
          <div
            className="boldAndUnderline"
            onClick={(e) => {
              handleReportAnswerClick(answer);
              setReportedAnswer("Reported");
            }}
          >
            {reportedAnswer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Answer;
