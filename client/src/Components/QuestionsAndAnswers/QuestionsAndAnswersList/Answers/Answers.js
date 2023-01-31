import axios from "axios";
import "../../QuestionsAndAnswers.css";

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
    // console.log("answer name is ", answer);
    return (
      <div className="answer" key={answer.id}>
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
