import Moment from 'react-moment'; //npm install react-moment
import axios from 'axios';
import { useState, useEffect } from 'react';

import './Review.scss';
import convertToStars from '../../Utils/convertToStars';
import handleFullScreen from '../../Utils/handleFullScreen';

function Review({ review, setShowModal }) {

  const [photos, setPhotos] = useState([])
  const [reviewStars, setReviewStars] = useState(<></>)

  const handlePhotoClick = (e) => {
    handleFullScreen(e.target, 'reviewPhoto');
  }


  const helpfulHandler = (e) => {
    axios.put(`http://localhost:8080/reviews/${review.review_id}/helpful`)
      .then(res => {
        setHelpful(<button className="helpful">Helpful! ({review.helpfulness}) |</button>)
      })
      .catch(err => console.log(err));
  }

  const reportHandler = (e) => {
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
      setPhotos(review.photos);
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
        {photos.map((element, index) => (
        <img className="reviewPhoto" key={index}
          src={element.url} alt="idek"
          onClick={handlePhotoClick}>
        </img>
      ))}
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
