import axios from "axios";
import "../../QuestionsAndAnswers.css";
import { useState, useEffect } from "react";

function Answers({ product, questionsAndAnswers, answersObject, question }) {
  const [answersContainer, setAnswersContainer] = useState([]);
  // this makes a lot of API requests? Seems fixed for now
  useEffect(() => {
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
    axios
      .put(`http://localhost:8080/qa/answers/${answer.id}/report`)
      .then((res) => {
        res.send(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleHelpfulAnswerClick(answer) {
    axios
      .put(`http://localhost:8080/qa/answers/${answer.id}/helpful`)
      .then((res) => {
        res.send(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  let answers = Object.values(answersContainer).map((answer) => {
    // console.log("answer name is ", answer);
    // console.log("answer id is ", answer.answer_id);

    return (
      <div className="answer" key={answer.answer_id}>
        <h3 className="answerLabel">A: </h3>
        <div className="answerRightSide">
          <div>{answer.body}</div>
          <div className="answerDetails">
            by {answer.answerer_name}, {answer.date} | helpful?{" "}
            <button
              onClick={(e) => {
                handleHelpfulAnswerClick(answer);
              }}
            >
              Yes{" "}
            </button>{" "}
            {/*yesCount*/} |{" "}
            <button
              onClick={(e) => {
                handleReportAnswerClick(answer);
              }}
            >
              Report
            </button>
          </div>
          <div>Pictures here</div>
        </div>
      </div>
    );
  });
  return (
    <div className="answerCard" key="answerCard">
      {answers}
      <button>Load more answers</button>
    </div>
  );
}

export default Answers;
