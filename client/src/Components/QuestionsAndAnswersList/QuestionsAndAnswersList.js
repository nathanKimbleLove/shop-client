import "./QuestionsAndAnswersList.scss";
import Answers from "../Answers/Answers";
import Question from "../Question/Question";
import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";

import prependRequests from '../../Utils/prependRequests.js';

function QuestionsAndAnswersList({
  product,
  questionsAndAnswers,
  searchTerms,
  setShowModal,
  questionsShown,
  user,
  setUser
}) {
  // questionsAndAnswers is an array of objects for all of the questions related to the current product.
  // Each object is a question. The answers are stored in questionsAndAnswers.answers
  // let questionCards = questionsAndAnswers;
  // for(var question in questionsAndAnswers) {
  //   answer.push
  // }
  // console.log("im in questionsandanswerslist and the question are", questionsAndAnswers);

  let [reportQuestionClicked, setReportQuestionClicked] = useState(false);
  // let [helpfulQuestionClicked, setHelpfulQuestionClicked] = useState(false);
  let [questionsArr, setQuestionsArr] = useState([]);
  let [page, setPage] = useState(1);
  let observer = useRef();
  let [helpfulQuestion, setHelpfulQuestion] = useState([]);
  let [reportQuestion, setReportQuestion] = useState([]);

  const addQuestions = useCallback(
    (add = true) => {
      // console.log(product);
      // console.log("we are printing the page: " + page);
      if (product) {
        axios
          .get(prependRequests() + "/qa/questions?product_id=" + product.id + "&page=" + page)
          .then((res) => {
            setPage(page + 1);
            if (!add) {
              questionsArr = [];
              setPage(1);
            }
            setQuestionsArr([...questionsArr, ...res.data.results]);
            // console.log("successfully retried questions");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [product, page, questionsArr]
  );

  // reset state / call add reviews
  // useEffect(() => {
  //   if (sort && product) {
  //     addReviews(false)
  //   }
  // }, [sort])

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      // console.log("calling for the observer");
      if (entry.isIntersecting) {
        addQuestions();
      }
    });
    observer.current.observe(document.querySelector("#loadMoreDetectorQA"));

    return () => {
      observer.current.disconnect();
    };
  }, [addQuestions]);

  var answer = questionsArr.slice(0, questionsShown).map((question) => {
    // check if search contains >=3 letters
    // console.log("question is here", question.question_helpfulness);
    var hidden = false;
    // var helpfulCount = question.question_id;
    if (searchTerms.length >= 3) {
      // if q or a does not contain search term
      if (!question.question_body.includes(searchTerms)) {
        // hide element
        // console.log("the search did not find " + searchTerms);
        hidden = true;
      } else {
        // else show element or do nothing
        // console.log("the search found " + searchTerms);
      }
    } else {
      // if no
      // then do nothing
    }
    // console.log("the question is ", question);
    return (
      <div className="questionAndAnswerCard" key={question.question_body} hidden={hidden}>
        <Question question={question} setShowModal={setShowModal} searchTerms={searchTerms} />
        <div className="answers">
          <Answers
            product={product}
            answers={questionsArr}
            answersObject={question.answers}
            question={question}
            setShowModal={setShowModal}
            user={user}
            setUser={setUser}
          />
        </div>
      </div>
    );
  });
  // sort by question helpfullness score. Need to implement user questions at top of list
  answer.sort((question1, question2) => {
    if (question1.question_helpfulness < question2.question_helpfulness) {
      return -1;
    }
    if (question1.question_helpfulness > question2.question_helpfulness) {
      return 1;
    }
    return 0;
  });
  if (answer.length === 0) {
    return <div>There are no answers for this product</div>;
  } else {
    return (
      <div>
        <div>{answer}</div>
      </div>
    ); //question cards go here
  }
}

export default QuestionsAndAnswersList;
