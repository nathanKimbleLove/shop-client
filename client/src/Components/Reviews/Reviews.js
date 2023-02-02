import axios from 'axios';
import { useState, useEffect } from 'react';

import './Reviews.css';
import Review from '../Review/Review.js';

function Reviews({ product, setShowModal, filterOptions })  {

  let baseQuery;
  let [reviewsArr, setReviewsArr] = useState([]);
  let [query, setQuery] = useState(null);
  let [reviewsArrLength, setReviewsArrLength] = useState(0);

  const modalHandler = () => {
    setShowModal("WriteReview", product);
  }

  const sortByHandler = (e) => {
    console.log(e.target.value)
    setQuery(baseQuery + `&sort=${e.target.value}`)
  }

  const filterReviews = (reviews) => {
    // takes in a gaggle of reviews
    // returns all reviews that meet the criteria in the same order
    let accept = []
    for (let option in filterOptions) {
      if (filterOptions[option]) {
        accept.push(parseInt(option));
      }
    }

    if (accept.length > 0) {
      let temp = [];
      for (let i = 0; i < reviews.length; i++) {
        if (accept.indexOf(reviews[i].rating) !== -1) {
          temp.push(reviews[i])
        }
      }
      return temp;
    } else {
      return reviews;
    }
  }

  const loadReviews = (reviews, add) => {
    // console.log('hello from loadReveiws')
    if (!add) {
      reviewsArr = [];
    }

    let newArr = filterReviews(reviews);
    setReviewsArrLength(newArr.length);

    let temp = newArr.map((element, index) => {
      return <Review review={element} key={element.review_id} setShowModal={setShowModal}/>
    })
    temp = [...reviewsArr, temp]
    setReviewsArr(<>{temp}</>);
  }

  let addReviews = () => {
    // console.log('hello from addReviews')
    axios.get(query)
    .then(res => {
      // console.log('hello')
      loadReviews(res.data.results, true);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    if (product) {
      baseQuery = `http://localhost:8080/reviews?product_id=${product.id}&count=30`;
      let query = baseQuery + '&sort=relevant'
      axios.get(query)
      .then(res => {
        loadReviews(res.data.results)
      })
      .catch(err => console.log(err));
    }
  }, [product, query, filterOptions])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        console.log('hit the bottom');
        addReviews();
      }
    });
      observer.observe(document.querySelector('#loadMoreDetector'));
  }, []);

  return (
    <div className="reviews" >
      <div className="reviewsInteractions">
        <span className="reviewSorter primaryText">
          {reviewsArrLength} reviews, sorted by
          <select name="sort-options" className="sortOptions accentColor primaryText" onChange={sortByHandler}>
            <option value="relevant">relevance</option>
            <option value="newest">newness</option>
            <option value="helpful">helpfulness</option>
          </select>
        </span>
        <button className="reviewAdder borderColor" onClick={modalHandler}>Write a Review!</button>
      </div>
      <div id="reviewArray" >
        {reviewsArr.length !== 0 && reviewsArr}
        <div id="loadMoreDetector"></div>
      </div>
    </div>
  );
}

export default Reviews;