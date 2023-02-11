import axios from "axios";
import "./Answers.scss";
import Answer from "../Answer/Answer";
import { useState, useEffect } from "react";

import prependRequests from "../../Utils/prependRequests.js";

function Answers({ question, user }) {
  const [answersContainer, setAnswersContainer] = useState([]);
  // const [answersRendered, shownAnswersRendered] = useState(0);
  const [answersShown, setAnswersShown] = useState(1);
  const [moreAnswersClicked, setMoreAnswersClicked] = useState(false);

  useEffect(() => {
    localStorage.clear();
    axios
      .get(prependRequests() + `/qa/questions/${question.question_id}/answers`)
      .then((res) => {
        setAnswersContainer(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [question]);

  let handleMoreAnswersClick = () => {
    setMoreAnswersClicked(true);
    if (answersShown < answersContainer.length) {
      setAnswersShown(answersContainer.length);
    }
  };

  let answers = answersContainer.map((answer) => {
    return <Answer key={answer.body + answer.date} answer={answer} user={user} />;
  });

  // will probably need to re-factor
  let loadDivs;
  if (answersContainer.length === 0) {
    loadDivs = <div>There are no answers for this question</div>;
  } else if (!moreAnswersClicked && answersShown < answersContainer.length - 1) {
    loadDivs = (
      <button className="loadAnswers" onClick={handleMoreAnswersClick}>
        Load more answers
      </button>
    );
  }
  return (
    <div className="answerCard">
      {answers}
      {loadDivs}
    </div>
  );
}

export default Answers;
