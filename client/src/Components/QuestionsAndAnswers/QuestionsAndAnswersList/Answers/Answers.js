import "../../QuestionsAndAnswers.css";

function Answers({ product, questionsAndAnswers, answersObject }) {
  let answers = Object.values(answersObject).map((answer) => {
    return (
      <div className="answer" key={answer.answer_name}>
        <h2>A: {answer.body}</h2>
        <div>
          by {answer.answerer_name}, {answer.date} | helpful?{" "}
          <button>Yes </button> {/*yesCount*/} | <button>Report</button>
        </div>
        <div>Pictures here</div>
      </div>
    );
  });
  return (
    <div>
      {answers}
      <button>Load more answers</button>
    </div>
  );
}

export default Answers;
