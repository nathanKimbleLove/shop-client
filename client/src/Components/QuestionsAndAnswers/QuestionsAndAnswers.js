import "./QuestionsAndAnswers.scss";
import QuestionsAndAnswersList from "./QuestionsAndAnswersList/QuestionsAndAnswersList";
import { GiMagnifyingGlass } from "react-icons/gi";
import axios from "axios";

function QuestionsAndAnswers({ product, questionsAndAnswers }) {
  function handleNewQuestionClick() {
    let username = prompt("What is your username");
    username += "";
    let question = prompt("What is your question");
    let email = prompt("What is your email");

    let request = {
      body: question,
      name: username,
      email: email,
      product_id: product.id
    };

    axios
      .post("http://localhost:8080/qa/questions", request)
      .then((res) => {
        console.log("successfully posted new question");
      })
      .catch((err) => {
        console.log("failing in questionsAndAnswers componenet");
      });

    // how to renrender answers for question?
    // another get request?
  }

  return (
    <div className="questionsAndAnswers">
      <h4>Questions and Answers</h4>
      <div>
        <form>
          <input type="text" placeholder="Search for a question or answer"></input>
          <GiMagnifyingGlass />
        </form>{" "}
      </div>
      {/* <QuestionsAndAnswersList product={product} questionsAndAnswers={questionsAndAnswers} /> */}
      <div>
        <button>More answered questions</button>
        <button onClick={handleNewQuestionClick}>Add a question</button>
      </div>
    </div>
  );
}

export default QuestionsAndAnswers;
