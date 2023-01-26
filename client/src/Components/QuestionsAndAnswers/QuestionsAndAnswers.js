import "./QuestionsAndAnswers.css";
import QuestionsAndAnswersList from "./QuestionsAndAnswersList/QuestionsAndAnswersList";
import { GiMagnifyingGlass } from "react-icons/gi";
//import { useState, useEffect } from 'react';

function QuestionsAndAnswers(product, questionsAndAnswers) {
  return (
    <div className="questionsAndAnswers">
      <div className="widgetName">Questions and Answers</div>
      <input
        type="text"
        placeholder="Search for a question or answer"
      ></input>{" "}
      <GiMagnifyingGlass />
      {/*placeholder for q/a list*/}
      <QuestionsAndAnswersList
        product={product}
        questionsAndAnswers={questionsAndAnswers}
      />
    </div>
  );
}

export default QuestionsAndAnswers;
