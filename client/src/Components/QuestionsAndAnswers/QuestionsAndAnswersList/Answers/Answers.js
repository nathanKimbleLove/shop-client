import axios from "axios";
import "../../QuestionsAndAnswers.css";

function Answers({ product, questionsAndAnswers, answersObject }) {
  function handleReportAnswerClick(answer) {
    console.log("in handler for report answer id " + answer.id);
    axios
      .put(`http://localhost:8080/qa/answers/${answer.id}/report`)
      .then((res) => {
        console.log("successfully made report answer click ");
        res.send(res.status);
      })
      .catch((err) => {
        console.log("failed to handle report answer click");
      });
  }

  function handleHelpfulAnswerClick(answer) {
    console.log("in handler for helpful answer id " + answer.id);
    axios
      .put(`http://localhost:8080/qa/answers/${answer.id}/helpful`)
      .then((res) => {
        console.log("successfully made helpful answer click ");
        res.send(res.status);
      })
      .catch((err) => {
        console.log("failed to handle helpful answer click");
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
