import dateFormat, { masks } from "dateformat";
import { useState, useEffect } from "react";
import axios from "axios";
import handleFullScreen from "../../Utils/handleFullScreen";
import "./Answer.scss";

function Answer({ answer, user }) {
  const [helpfulAnswerClicked, setHelpfulAnswerClicked] = useState(false);
  const [reportAnswerClicked, setReportAnswerClicked] = useState(false);
  const [reportedAnswer, setReportedAnswer] = useState("Report");
  const [usernameTextStyle, setUsernameTextStyle] = useState("usernameNormal");
  const [answerHelpfulness, setAnswerHelpfulness] = useState(0);
  const [photos, setPhotos] = useState([[]]);
  const [photosElements, setPhotosElements] = useState(<></>);

  function handleReportAnswerClick(answer) {
    if (!reportAnswerClicked) {
      setReportAnswerClicked(true);
      axios
        .put(`/qa/answers/${answer.answer_id}/report`)
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
        .put(`/qa/answers/${answer.answer_id}/helpful`)
        .then((res) => {
          res.sendStatus(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  }

  const handlePhotoClick = (e) => {
    handleFullScreen(e.target, "answerPhoto");
  };

  useEffect(() => {
    if (answer.photos[0]) {
      setPhotos(answer.photos);
    }
  }, [answer]);

  if (photos.length === 0) {
    setPhotosElements(<div>There are no images for this answer</div>);
  } else {
    let photosVar = photos.map((element, index) => {
      return (
        <img
          className="answerPhoto"
          key={index}
          src={element.url}
          alt="Bad format"
          onClick={handlePhotoClick}
        ></img>
      );
    });
    setPhotosElements(photosVar);
  }
  // add username bold if it matches user
  return (
    <div className={`answer ${answer.answer_id}`} key={answer.answer_id}>
      <h3 className="answerLabel">A: </h3>
      <div className="answerRightSide">
        <div>{answer.body}</div>
        <div className="answerPhotos">{photosElements} </div>
        <div className="answerDetails">
          by <div className={usernameTextStyle}> {answer.answerer_name}</div>,{" "}
          {dateFormat(answer.date, "mmmm dd, yyyy")} | Helpful?{" "}
          <div
            className="boldAndUnderline"
            onClick={(e) => {
              console.log("answer is ", answer);
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
