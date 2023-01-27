import "../QuestionsAndAnswers.css";
import Answers from "./Answers/Answers";

function QuestionsAndAnswersList({ product, questionsAndAnswers }) {
  // questionsAndAnswers is an array of objects for all of the questions related to the current product.
  // Each object is a question. The answers are stored in questionsAndAnswers.answers
  // let questionCards = questionsAndAnswers;
  // for(var question in questionsAndAnswers) {
  //   answer.push
  // }
  var summary;
  if (questionsAndAnswers.length > 2) {
    summary = (
      <h3>
        There are {questionsAndAnswers.length} questions related to this product
      </h3>
    );
  } else if (questionsAndAnswers.length === 1) {
    summary = <h3>There is one question related to this product</h3>;
  } else {
    summary = <h3>There are no questions related to this product</h3>;
  }
  console.log(
    "im in questionsandanswerslist and the question are",
    questionsAndAnswers
  );
  var answer = questionsAndAnswers.map((question) => {
    return (
      <div className="questionAndAnswerCard" key={question.question_body}>
        <div className="questionOptions">
          <h2>Q: {question.question_body}</h2> <div>Helpful?</div>{" "}
          <button>Yes</button> {/*helpfulCount*/} | <button>Add Answer</button>
        </div>
        <div className="answers">
          <Answers
            product={product}
            answers={questionsAndAnswers}
            answersObject={question.answers}
          />
        </div>
      </div>
    );
  });
  return (
    <div>
      {summary}
      <div>{answer}</div>
    </div>
  ); //question cards go here
}

export default QuestionsAndAnswersList;
