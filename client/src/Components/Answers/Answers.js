import axios from "axios";
import "./Answers.scss";
import Answer from "../Answer/Answer";
import { useState, useEffect, useReducer } from "react";
import dateFormat, { masks } from "dateformat";
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
  // const [helpfulAnswerClicked, setHelpfulAnswerClicked] = useLocalStorage(
  //   "helpfulAnswerClicked",
  //   []
  // );
  // const [reportAnswerClicked, setReportAnswerClicked] = useLocalStorage("reportAnswerClicked", []);
  // const [helpfulObj, setHelpfulObj] = useState({});
  // const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  // this makes a lot of API requests? Seems fixed for now
  useEffect(() => {
    localStorage.clear();
    // localStorage.removeItem("helpfulAnswerClicked");
    // localStorage.removeItem("reportAnswerClicked");
    // setHelpfulAnswerClicked();
    // setReportAnswerClicked();
    axios
      .get(`/qa/questions/${question.question_id}/answers`)
      .then((res) => {
        setAnswersContainer(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
