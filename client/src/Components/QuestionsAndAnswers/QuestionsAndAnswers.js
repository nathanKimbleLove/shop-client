import "./QuestionsAndAnswers.css";
import QuestionsAndAnswersList from "./QuestionsAndAnswersList/QuestionsAndAnswersList";
import { GiMagnifyingGlass } from "react-icons/gi";
import axios from "axios";
import { useState, useEffect } from "react";

function QuestionsAndAnswers({ product, questionsAndAnswers }) {
  // get questions from API
  const [questions, setQuestions] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    if (product) {
      axios
        .get("http://localhost:8080/qa/questions?product_id=" + product.id)
        .then((res) => {
          setQuestions(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [product]);

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
        // console.log("successfully posted new question");
      })
      .catch((err) => {
        // console.log("failing in questionsAndAnswers componenet");
      });

    // how to renrender answers for question?
    // another get request?
  }
  // console.log("in questionsAndAnswers questions is ", questions);

  const handleSearchTermChange = (event) => {
    // console.log("you're in handleSearchTermChange ", event.target.value);
    setSearchTerms(event.target.value);
  };

  return (
    <div className="questionsAndAnswers">
      <h4>Questions and Answers</h4>
      <div>
        <form>
          <input
            type="text"
            value={searchTerms}
            onChange={handleSearchTermChange}
            placeholder="Search for a question or answer"
          ></input>
          <GiMagnifyingGlass />
        </form>{" "}
      </div>
      <QuestionsAndAnswersList
        product={product}
        questionsAndAnswers={questions}
        searchTerms={searchTerms}
      />
      <div>
        <button>More answered questions</button>
        <button onClick={handleNewQuestionClick}>Add a question</button>
      </div>
    </div>
  );
}

export default QuestionsAndAnswers;
