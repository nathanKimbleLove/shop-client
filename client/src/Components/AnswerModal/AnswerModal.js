import "./AnswerModal.scss";
import { useState } from "react";
import axios from "axios";

import prependRequests from '../../Utils/prependRequests.js';

let AnswerModal = ({ question, setUser, product }) => {
  const [username, setUsername] = useState("");
  const [answer, setAnswer] = useState("");
  const [email, setEmail] = useState("");
  const [urls, setUrls] = useState("");
  // console.log("on mount this is question ", question);

  let handleSubmit = (question) => {
    // console.log("made it into handleSubmit");
    // console.log("the question in AnswerModal is ", question);
    let arrayOfImageURLs;
    if (urls.length === 0) {
      arrayOfImageURLs = [];
    } else if (!urls.includes(", ")) {
      arrayOfImageURLs = [urls];
    } else {
      arrayOfImageURLs = urls.split(", ");
    }

    const request = {
      body: answer,
      name: username,
      email: email,
      photos: arrayOfImageURLs
    };
    // console.log("the request is ", request);
    // console.log(question);
    axios
      .post(prependRequests() + `/qa/questions/${question.question_id}/answers`, request)
      .then((res) => {
        // console.log("successfully made answer post request with modal");
        res.send(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="answerModal">
      <div>Submit your Answer</div>
      <div>
        {product.name}: {question.question_body}
      </div>
      <form className="inputs" onSubmit={(e) => handleSubmit(question)}>
        <label className="label">
          Your Answer *
          <input
            type="text"
            value={answer}
            required="required"
            maxLength={1000}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer to the question"
          ></input>
        </label>
        <label className="label">
          What is your nickname *
          <input
            type="text"
            maxLength={60}
            required="required"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUser(e.target.value);
            }}
            placeholder="Example: jack543!"
            size="34"
          ></input>
          For privacy reasons, do not use your full name or email address
        </label>
        <label className="label">
          Your email *
          <input
            value={email}
            maxLength={60}
            required="required"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Example: jack@email.com"
            size="34"
          ></input>
          For authentication reasons, you will not be emailed
        </label>
        <label className="label">
          URLs
          <input
            type="text"
            placeholder="Enter image URLs (command and space seperated)"
            size="45"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
          ></input>
          <div> or </div>
          <input type="file" multiple="multiple" accept="image/*"></input>
        </label>
        <input className="submit" type="submit" value="Submit your answer"></input>
      </form>
    </div>
  );
};

export default AnswerModal;
