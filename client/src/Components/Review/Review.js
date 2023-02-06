import Moment from 'react-moment'; //npm install react-moment
import axios from 'axios';
import { useState, useEffect } from 'react';

import './Review.css';
import convertToStars from '../../Utils/convertToStars.js';

import { BsStarFill, BsStar} from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsMegaphoneFill } from 'react-icons/bs'

function Review({ review, setShowModal }) {

  let [photos, setPhotos] = useState(<></>)
  let [reviewStars, setReviewStars] = useState(<></>)

  let helpfulHandler = (e) => {
    // review.review_id
    axios.put(`http://localhost:8080/reviews/${review.review_id}/helpful`)
      .then(res => {
        setHelpful(<button className="heartOutline heartFilled" >Helpful! ({review.helpfulness}) |</button>)
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

  let [helpful, setHelpful] = useState(<button className="heartOutline" onClick={helpfulHandler}>Helpful? ({review.helpfulness}) |</button>)
  let [report, setReport] = useState(<button className="report" onClick={reportHandler}>Report.</button>)

  useEffect(() => {
    if (review.photos[0]) {
      let temp = review.photos.map((element, index) => {
        return <img className="reviewPhoto" key={index} src={element.url} alt="photo"></img>
      })
      setPhotos(temp)
    }
    setReviewStars(<span>{convertToStars(review.rating)}</span>);
  }, [review])

  return (
    <div className="review borderColor">
      <div className= "reviewTopBar">
        {reviewStars}
        <span className="secondaryTextColor">{review.reviewer_name}, <Moment fromNow>{review.date}</Moment> </span>
      </div>
      <div className="reviewTitle primaryText">{review.summary}</div>
      <div className="reviewContent">{review.body}</div>
      <div className="reviewPhotos">
        {photos}
      </div>
      <div className="reviewBottomBar">
        {helpful}
        {report}
        {review.recommend && "I recommend this product!"}
      </div>
    </div>
  );
}

export default Review;
