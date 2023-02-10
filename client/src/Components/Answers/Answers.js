import axios from "axios";
import "./Answers.scss";
import Answer from "../Answer/Answer";
import { useState, useEffect, useReducer } from "react";
import dateFormat, { masks } from "dateformat";
import useLocalStorage from "./useLocalStorage";

function Answers({
  product,
  questionsAndAnswers,
  answersObject,
  question,
  setShowModal,
  user,
  setUser
}) {
  const [answersContainer, setAnswersContainer] = useState([]);
  const [answersRendered, shownAnswersRendered] = useState(0);
  const [answersShown, setAnswersShown] = useState(2);
  const [moreAnswersClicked, setMoreAnswersClicked] = useState(false);
  const [helpfulAnswerClicked, setHelpfulAnswerClicked] = useLocalStorage(
    "helpfulAnswerClicked",
    []
  );
  const [reportAnswerClicked, setReportAnswerClicked] = useLocalStorage("reportAnswerClicked", []);
  const [helpfulObj, setHelpfulObj] = useState({});
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  // this makes a lot of API requests? Seems fixed for now
  useEffect(() => {
    localStorage.clear();
    localStorage.removeItem("helpfulAnswerClicked");
    localStorage.removeItem("reportAnswerClicked");
    setHelpfulAnswerClicked();
    setReportAnswerClicked();
    axios
      .get(`http://localhost:8080/qa/questions/${question.question_id}/answers`)
      .then((res) => {
        // console.log("in answers.js the res.data is ", res.data);
        setAnswersContainer(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleReportAnswerClick(answer) {
    // console.log("in handle report answer clicked " + answer.answer_id);
    if (!JSON.parse(localStorage.getItem("reportAnswerClicked")).includes(answer.answer_id)) {
      setReportAnswerClicked(answer.answer_id);
      axios
        .put(`http://localhost:8080/qa/answers/${answer.answer_id}/report`)
        .then((res) => {
          // console.log("successfully sent put request (changed)");
          res.sendStatus(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
      // setReported("Reported");
    } else {
      // console.log("did not execute put request");
    }
    // change button to "reported"
  }

  function handleHelpfulAnswerClick(answer) {
    // console.log("in handle helpful answer clicked " + answer.answer_id);
    let answerID = answer.answer_id;
    setHelpfulObj({
      ...helpfulObj,
      answerID: 1
    });
    if (!JSON.parse(localStorage.getItem("helpfulAnswerClicked")).includes(answer.answer_id)) {
      setHelpfulAnswerClicked(answer.answer_id);
      // console.log("put request attempted for helpful answer click");
      axios
        .put(`http://localhost:8080/qa/answers/${answer.answer_id}/helpful`)
        .then((res) => {
          // console.log("successfully sent put request (changed)");
          res.sendStatus(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // console.log("did not execute put request");
    }
  }

  let handleMoreAnswersClick = () => {
    setMoreAnswersClicked(true);
    if (answersShown <= answersContainer.length) {
      setAnswersShown(answersContainer.length);
    }
  };

  let answers = Object.values(answersContainer.slice(0, answersShown)).map((answer) => {
    return <Answer answer={answer} user={user} />;
  });

  // will probably need to re-factor
  let loadDivs;
  if (answers.length === 0) {
    loadDivs = <div>There are no answers for this question</div>;
  } else if (!moreAnswersClicked && answers > 2) {
    loadDivs = (
      <button className="loadAnswers" onClick={handleMoreAnswersClick}>
        Load more answers
      </button>
    );
  }
  return (
    <div className="answerCard" key="answerCard">
      {answers}
      {loadDivs}
    </div>
  );
}

export default Answers;
