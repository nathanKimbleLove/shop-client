import "./AnswerModal.css";
import { useState } from "react";
import axios from "axios";

let AnswerModal = ({ question }) => {
  const [username, setUsername] = useState("");
  const [answer, setAnswer] = useState("");
  const [email, setEmail] = useState("");
  const [urls, setUrls] = useState("");
  console.log("on mount this is question ", question);

  let handleSubmit = (question) => {
    console.log("made it into handleSubmit");
    console.log("the question in AnswerModal is ", question);
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
    console.log("the request is ", request);
    console.log(question);
    axios
      .post(`http://localhost:8080/qa/questions/${question.question_id}/answers`, request)
      .then((res) => {
        console.log("successfully made answer post request with modal");
        res.send(res.status);
      })
      .catch((err) => {
        console.log("answer modal post failed");
      });
  };

  return (
    <div className="answerModal">
      <div>
        <form className="inputs" onSubmit={(e) => handleSubmit(question)}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => {
                console.log("made it into onChange");
                console.log("on change this is question ", question);
                setUsername(e.target.value);
              }}
              placeholder="Enter your username"
              size="34"
            ></input>
          </label>
          <label>
            Answer
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer to the question"
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
          <label>
            URLs
            <input
              type="text"
              placeholder="Enter image URLs (command and space seperated)"
              size="34"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
            ></input>
          </label>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  );
};

export default AnswerModal;
