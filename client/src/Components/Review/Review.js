import Moment from 'react-moment'; //npm install react-moment

import './Review.css';
import convertToStars from '../convertToStars.js';

import { BsStarFill, BsStar} from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsMegaphoneFill } from 'react-icons/bs'

function Review( {review} ) {
  console.log(review);

  return (
    <div className="review borderColor">
      <div className= "reviewTopBar">
        <span>{convertToStars(review.rating)}</span>
        <span className="secondaryTextColor">{review.reviewer_name}, <Moment fromNow>{review.date}</Moment> </span>
      </div>
      <div className="reviewTitle primaryText">{review.summary}</div>
      <div className="reviewContent">{review.body} </div>
      <div className="reviewBottomBar">
        <button className="heartOutline"><AiOutlineHeart /></button>
        <button className="report"><BsMegaphoneFill /></button>
      </div>
    </div>
  );
}

export default Review;
