import axios from "axios";
import "../../QuestionsAndAnswers.scss";

function Answers({ product, questionsAndAnswers, answersObject }) {
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
  let answers = Object.values(answersObject).map((answer) => {
    return (
      <div className="answer" key={answer.answer_name}>
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
    <div className="answerCard" key={answersObject.asker_name}>
      {answers}
      <button>Load more answers</button>
    </div>
  );
}

export default Answers;
