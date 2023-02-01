import axios from 'axios';
import { useState, useEffect} from 'react';

import './Reviews.css';
import Review from '../Review/Review.js';

function Reviews({ product, setShowModal })  {

  let [reviewsArr, setReviewsArr] = useState([]);

  let loadReviews = (reviews) => {
    let temp = reviews.map((element, index) => {
      return <Review review={element} key={index} setShowModal={setShowModal}/>
    })
    temp = [...reviewsArr, temp]
    setReviewsArr(<>{temp}</>);
  }

  let modalHandler = () => {
    setShowModal("WriteReview", product);
  }

  useEffect(() => {
        axios.get(`http://localhost:8080/reviews?product_id=${product.id}&count=15`)
        .then(res => {
          loadReviews(res.data.results)
        })
        .catch(err => console.log(err));
  }, [product])

  return (
    <div className="reviews">
      <div className="reviewsInteractions">
        <span className="reviewSorter primaryText">
          248 reviews, sorted by
          <select name="sort-options" className="sortOptions accentColor primaryText">
            <option value="relevance">relevance</option>
            <option value="coolness">coolness</option>
            <option value="dopeness">dopeness</option>
            <option value="sickness">sickness</option>
          </select>
        </span>
        <button className="reviewAdder borderColor" onClick={modalHandler}>Write a Review!</button>
      </div>
      <div className="reviewArray">
        {reviewsArr.length !== 0 && reviewsArr}
      </div>
    </div>
  );
}

export default Reviews;