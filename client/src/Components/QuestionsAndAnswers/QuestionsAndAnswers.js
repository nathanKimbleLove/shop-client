import "./QuestionsAndAnswers.scss";
import QuestionsAndAnswersList from "../QuestionsAndAnswersList/QuestionsAndAnswersList";
import { GiMagnifyingGlass } from "react-icons/gi";
import axios from "axios";
import { useState, useEffect } from "react";

import prependRequests from '../../Utils/prependRequests.js';

function QuestionsAndAnswers({ product, questionsAndAnswers, setShowModal, user, setUser }) {
  // get questions from API
  const [questions, setQuestions] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [questionsShown, setQuestionsShown] = useState(4);

  useEffect(() => {
    if (product) {
      axios
        .get(prependRequests() + "/qa/questions?product_id=" + product.id)
        .then((res) => {
          setQuestions(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [product]);

  let handleMoreQuestionsClick = () => {
    // fix so we don't go out of bounds / stay accurate
    setQuestionsShown(questionsShown + 2);
  };

  const handleSearchTermChange = (event) => {
    // console.log("you're in handleSearchTermChange ", event.target.value);
    setSearchTerms(event.target.value);
  };

  let buttons;
  if (questions.length !== 0) {
    buttons = <button onClick={handleMoreQuestionsClick}>More answered questions</button>;
  }

  return (
    <div className="questionsAndAnswers">
      <h4>Questions and Answers</h4>
      <div className="qaSearchBar">
        <form>
          <input
            type="text"
            value={searchTerms}
            onChange={handleSearchTermChange}
            placeholder="Have a question? Search for answers…"
            size="34"
          ></input>
          <GiMagnifyingGlass />
        </form>{" "}
      </div>
      <div className="questionsArray">
        <QuestionsAndAnswersList
          product={product}
          questionsAndAnswers={questions}
          searchTerms={searchTerms}
          setShowModal={setShowModal}
          questionsShown={questionsShown}
          user={user}
          setUser={setUser}
        />
        <div id="loadMoreDetectorQA"></div>
      </div>
      <div className="lastButtons">
        {buttons}
        <button
          onClick={(e) => {
            setShowModal("QuestionModal", product);
          }}
        >
          Add a question
        </button>
      </div>
    </div>
  );
}

export default QuestionsAndAnswers;
