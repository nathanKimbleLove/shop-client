import "./QuestionsAndAnswers.css";
import QuestionsAndAnswersList from "./QuestionsAndAnswersList/QuestionsAndAnswersList";
import { GiMagnifyingGlass } from "react-icons/gi";
//import { useState, useEffect } from 'react';

function QuestionsAndAnswers({ product, questionsAndAnswers }) {
  return (
    <div className="questionsAndAnswers">
      <h1>Questions and Answers</h1>
      <input
        type="text"
        placeholder="Search for a question or answer"
      ></input>{" "}
      <GiMagnifyingGlass />
      <QuestionsAndAnswersList
        product={product}
        questionsAndAnswers={questionsAndAnswers}
      />
      <button>More answered questions</button>
      <button>Add a question</button>
    </div>
  );
}

export default QuestionsAndAnswers;
