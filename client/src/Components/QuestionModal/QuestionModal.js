import "./QuestionModal.css";
import { useState } from "react";
import axios from "axios";

let QuestionModal = ({ product }) => {
  const [question, setQuestion] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);

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
        <div>Ask Your Question</div>
        <div>About the {product.name}</div>
        <form className="inputs" onSubmit={(e) => handleSubmit(product)}>
          <label className="label">
            Your Question *
            <input
              type="text"
              maxLength={1000}
              value={question}
              required="required"
              className="questionTextBox"
              onChange={(e) => {
                console.log("made it into onChange");
                console.log("on change this is product ", product);
                setQuestion(e.target.value);
              }}
              placeholder="Enter your question"
            ></input>
          </label>
          <label className="label">
            What is your nickname *
            <input
              type="text"
              maxLength={60}
              value={username}
              required="required"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Example: jackson11!"
              size="34"
            ></input>
            For privacy reasons, do not use your full name or email address
          </label>
          <label className="label">
            Your emal *
            <input
              value={email}
              maxLength={60}
              required="required"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Why did you like the product or not?"
              size="34"
            ></input>
            For authentication reasons, you will not be emailed
          </label>
          <input className="submit" type="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;
