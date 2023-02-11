import "./QuestionsAndAnswersList.scss";
import Answers from "../Answers/Answers";
import Question from "../Question/Question";
import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";

import prependRequests from "../../Utils/prependRequests.js";

function QuestionsAndAnswersList({ product, searchTerms, setShowModal, user }) {
  let [questionsArr, setQuestionsArr] = useState([]);
  let [page, setPage] = useState(1);
  let observer = useRef();

  const addQuestions = useCallback(
    (add = true) => {
      if (!add) {
        questionsArr = [];
        setPage(1);
        page = 1;
      }
      console.log("page ", page);
      if (product) {
        axios
          .get(prependRequests() + "/qa/questions?product_id=" + product.id + "&page=" + page)
          .then((res) => {
            setPage(page + 1);
            setQuestionsArr([...questionsArr, ...res.data.results]);
            console.log("infinite next worked");
          })
          .catch((err) => {
            console.log("infinite next failed");
            console.log(err);
          });
      } else {
        console.log("no product defined");
      }
    },
    [product, page, questionsArr]
  );

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      console.log("calling for the observer");
      if (entry.isIntersecting) {
        console.log("Intersected");
        addQuestions();
      }
    });
    observer.current.observe(document.querySelector("#loadMoreDetectorQA"));

    return () => {
      observer.current.disconnect();
    };
  }, [addQuestions]);

  // changed below from var answer = questionsArr.slice(0, questionsShown).map((question) => {

  if (questionsArr.length === 0) {
    return <div>There are no answers for this product</div>;
  } else {
    return (
      <div>
        <div>
          {questionsArr
            .map((question, index) => {
              // check if search contains >=3 letters
              var hidden = false;
              if (searchTerms.length >= 3) {
                // if q or a does not contain search term
                if (!question.question_body.includes(searchTerms)) {
                  hidden = true;
                }
              }
              return (
                <div
                  className="questionAndAnswerCard"
                  key={"found the issue 1" + question.question_id + question.question_date + index}
                  hidden={hidden}
                >
                  <Question
                    key={question.question_id + question.question_date}
                    question={question}
                    setShowModal={setShowModal}
                    searchTerms={searchTerms}
                  />
                  <div className="answers">
                    <Answers key={question.question_id} question={question} user={user} />
                  </div>
                </div>
              );
            })
            .sort((question1, question2) => {
              if (question1.question_helpfulness < question2.question_helpfulness) {
                return -1;
              }
              if (question1.question_helpfulness > question2.question_helpfulness) {
                return 1;
              }
              return 0;
            })}
        </div>
      </div>
    );
  }
}

export default QuestionsAndAnswersList;
