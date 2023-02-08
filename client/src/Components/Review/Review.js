import Moment from 'react-moment'; //npm install react-moment
import axios from 'axios';
import { useState, useEffect } from 'react';

import './Review.scss';
import convertToStars from '../../Utils/convertToStars';

function Review({ review, setShowModal }) {

  let [photos, setPhotos] = useState(<></>)
  let [reviewStars, setReviewStars] = useState(<></>)

  let helpfulHandler = (e) => {
    // review.review_id
    axios.put(`http://localhost:8080/reviews/${review.review_id}/helpful`)
      .then(res => {
        setHelpful(<button className="helpful">Helpful! ({review.helpfulness}) |</button>)
      })
      .catch(err => console.log(err));
  }

  let reportHandler = (e) => {
    // review.review_id
    axios.put(`http://localhost:8080/reviews/${review.review_id}/report`)
      .then(res => {
        setReport(<button className="report reported">Reported.</button>)
      })
      .catch(err => console.log(err));
  }

  let [helpful, setHelpful] = useState(<button className="helpful" onClick={helpfulHandler}>Helpful? ({review.helpfulness}) |</button>)
  let [report, setReport] = useState(<button className="report" onClick={reportHandler}>Report.</button>)

  useEffect(() => {
    if (review.photos[0]) {
      let temp = review.photos.map((element, index) => {
        return <img className="reviewPhoto" key={index} src={element.url} alt="idek"></img>
      })
      setPhotos(temp)
    }
    setReviewStars(<span>{convertToStars(review.rating)}</span>);
  }, [review])

  return (
    <div className="review ">
      <div className= "reviewTopBar">
        <span>{convertToStars(review.rating)}</span>
        <span>{review.reviewer_name}, <Moment fromNow>{review.date}</Moment> </span>
      </div>
      <div className="reviewTitle primaryText">{review.summary}</div>
      <div className="reviewContent">{review.body}</div>
      <div className="reviewPhotos">
        {photos}
      </div>
      <div className="reviewBottomBar">
        <div className="reviewButtons">
          {helpful}
          {report}
        </div>
        {review.recommend && "I recommend this product!"}
      </div>
    </div>
  );
}

export default Review;
