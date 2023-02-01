import Moment from 'react-moment'; //npm install react-moment
import axios from 'axios';
import { useState } from 'react';

import './Review.css';
import convertToStars from '../convertToStars.js';

import { BsStarFill, BsStar} from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsMegaphoneFill } from 'react-icons/bs'

function Review({ review, setShowModal }) {

  let helpfulHandler = (e) => {
    // review.review_id
    axios.put(`http://localhost:8080/reviews/${review.review_id}/helpful`)
      .then(res => {
        console.log(res)
        setHelpful(<button className="heartOutline heartFilled" ><AiFillHeart /></button>)
      })
      .catch(err => console.log(err));
  }

  let reportHandler = (e) => {
    // review.review_id
    axios.put(`http://localhost:8080/reviews/${review.review_id}/report`)
      .then(res => {
        console.log(res)
        setReport(<button className="report reported"><BsMegaphoneFill /></button>)
      })
      .catch(err => console.log(err));
  }

  let [helpful, setHelpful] = useState(<button className="heartOutline" onClick={helpfulHandler}><AiOutlineHeart /></button>)
  let [report, setReport] = useState(<button className="report" onClick={reportHandler}><BsMegaphoneFill /></button>)

  let modalHandler = () =>  {
    setShowModal("Review", review);
  }

  return (
    <div className="review borderColor">
      <div className= "reviewTopBar">
        <span>{convertToStars(review.rating)}</span>
        <span className="secondaryTextColor">{review.reviewer_name}, <Moment fromNow>{review.date}</Moment> </span>
      </div>
      <div className="reviewTitle primaryText">{review.summary}</div>
      <div className="reviewContent">{review.body}</div>
      <div className="reviewBottomBar">
        {helpful}
        {report}
        <button className="showModalTemp" onClick={modalHandler}>Temp -- Show Modal</button>
      </div>
    </div>
  );
}

// need to display photos somewhere
  // review.photos =  [ { id, url }, { id, url }, { id, url }]
  // url is http://res.cloudinary.com/abcdefg

export default Review;
