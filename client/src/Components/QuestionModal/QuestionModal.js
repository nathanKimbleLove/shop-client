import "./QuestionModal.css";
import { useState } from "react";
import axios from "axios";

let QuestionModal = ({ product }) => {
  const [question, setQuestion] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  let handleSubmit = (product) => {
    console.log("made it into handleSubmit in Question Modal");
    console.log("the product in handleSubmit is ", product);

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
        console.log(err);
        console.log("failing in QuestionModal componenet");
      });
  };

  return (
    <div className="questionModal">
      <div>
        <form className="inputs" onSubmit={(e) => handleSubmit(product)}>
          <label>
            Question
            <input
              type="text"
              value={question}
              onChange={(e) => {
                console.log("made it into onChange");
                console.log("on change this is product ", product);
                setQuestion(e.target.value);
              }}
              placeholder="Enter your question"
              size="34"
            ></input>
          </label>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              size="34"
            ></input>
          </label>
          <label>
            E-mail
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email (must have @)"
              size="34"
            ></input>
          </label>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;
