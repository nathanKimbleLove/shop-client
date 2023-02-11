import "./QuestionsAndAnswers.scss";
import QuestionsAndAnswersList from "../QuestionsAndAnswersList/QuestionsAndAnswersList";
import { GiMagnifyingGlass } from "react-icons/gi";
import { useState } from "react";

function QuestionsAndAnswers({ product, setShowModal, user, setUser }) {
  const [searchTerms, setSearchTerms] = useState("");
  // unnecesary right now
  // useEffect(() => {
  //   if (product) {
  //     axios
  //       .get(prependRequests() + "/qa/questions?product_id=" + product.id)
  //       .then((res) => {
  //         setQuestions(res.data.results);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [product]);

  const handleSearchTermChange = (event) => {
    setSearchTerms(event.target.value);
  };

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
          searchTerms={searchTerms}
          setShowModal={setShowModal}
          user={user}
        />
        <div id="loadMoreDetectorQA"></div>
      </div>
      <div className="lastButtons">
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
