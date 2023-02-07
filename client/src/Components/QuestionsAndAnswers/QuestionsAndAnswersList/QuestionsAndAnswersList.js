import "../QuestionsAndAnswers.scss";
import Answers from "./Answers/Answers";
import axios from "axios";

function QuestionsAndAnswersList({ product, questionsAndAnswers, searchTerms, setShowModal }) {
  // questionsAndAnswers is an array of objects for all of the questions related to the current product.
  // Each object is a question. The answers are stored in questionsAndAnswers.answers
  // let questionCards = questionsAndAnswers;
  // for(var question in questionsAndAnswers) {
  //   answer.push
  // }
  // console.log("im in questionsandanswerslist and the question are", questionsAndAnswers);

  function handleNewAnswerClick(question) {
    // console.log("this is the question: ", question);
    const username = prompt("What is your username");
    const answer = prompt("What is your answer to the question");
    const email = prompt("What is your email");
    let arrayOfImageURLs;
    let stringOfImageURLs = prompt(
      'What image URLs would you like to display (comma & space separated ", ")'
    );
    if (stringOfImageURLs.length === 0) {
      arrayOfImageURLs = [];
    } else {
      arrayOfImageURLs = stringOfImageURLs.split(", ");
    }
    const request = {
      body: answer,
      name: username,
      email: email,
      photos: arrayOfImageURLs
    };
    // console.log("the request is here ", request);
    // console.log("the question is here ", question);
    // console.log("the id is here ", question.question_id);

    axios
      .post(`http://localhost:8080/qa/questions/${question.question_id}/answers`, request)
      .then((res) => {
        res.send(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleHelpfulQuestionClick(question_id) {
    // console.log("in handler for helpful questions question id " + question_id);
    axios
      .put(`http://localhost:8080/qa/questions/${question_id}/helpful`)
      .then((res) => {
        res.send(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleReportQuestionClick(question_id) {
    axios
      .put(`http://localhost:8080/qa/questions/${question_id}/report`)
      .then((res) => {
        res.send(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  var answer = questionsAndAnswers.map((question) => {
    // check if search contains >=3 letters
    var hidden = false;
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
        <div className="questionOptions">
          <h3>Q: {question.question_body}</h3>
          <div className="helpAndAdd">
            <div>Helpful?</div>{" "}
            <button
              onClick={(e) => {
                handleHelpfulQuestionClick(question.question_id);
              }}
            >
              Yes
            </button>{" "}
            {/*helpfulCount*/} |{" "}
            <button onClick={(e) => handleReportQuestionClick(question.question_id)}>
              Report Question
            </button>{" "}
            <button
              onClick={(e) => {
                // handleNewAnswerClick(question);
                setShowModal("AnswerModal", question);
              }}
            >
              Add Answer
            </button>
          </div>
        </div>
        <div className="answers">
          <Answers
            product={product}
            answers={questionsAndAnswers}
            answersObject={question.answers}
            question={question}
            setShowModal={setShowModal}
          />
        </div>
      </div>
    );
  });
  return (
    <div>
      <div>{answer}</div>
    </div>
  ); //question cards go here
}

export default QuestionsAndAnswersList;
