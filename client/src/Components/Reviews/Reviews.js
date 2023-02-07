import axios from 'axios';
import { useState, useEffect, useRef, useCallback} from 'react';

import './Reviews.scss';
import Review from '../Review/Review.js';

function Reviews({ product, setShowModal, filterOptions })  {

  let baseQuery = `http://localhost:8080/reviews?count=10&product_id=`;
  let [reviewsArr, setReviewsArr] = useState([]);
  let [displayedReviews, setDisplayedReviews] = useState([]);
  let [productId, setProductId] = useState('');
  let [page, setPage] = useState(1);
  let [sort, setSort] = useState('&sort=relevant');

  let observer = useRef()

  const modalHandler = () => {
    setShowModal("WriteReview", product);
  }

  const sortByHandler = (e) => {
    setSort(`&sort=${e.target.value}`)
  }



  const addReviews = useCallback((add = true) => {

    axios.get(`http://localhost:8080/reviews/?product_id=${product.id}&count=10&page=${page}${sort}`)
    .then(res => {
      setPage(page + 1)
      if (!add) {
        reviewsArr = [];
        setPage(1)
      }
      setReviewsArr([...reviewsArr, ...res.data.results]);
    })
    .catch(err => {
      console.log(err);
    })
  }, [product, page, reviewsArr]);


  // reset state / call add reviews
  useEffect(() => {
    if (sort && product) {
      addReviews(false)
    }
  }, [sort, product])

  // create observer which calls addReviews when @ btm of list
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0]
        if (entry.isIntersecting) {
          addReviews()
        }
      })
      observer.current.observe(document.querySelector('#loadMoreDetector'));

    return () => {
      observer.current.disconnect();
    }
  }, [addReviews]);

  // filter al results
  useEffect(() => {
    let accept = []
    for (let option in filterOptions) {
      if (filterOptions[option]) {
        accept.push(parseInt(option));
      }
    }

    if (accept.length > 0) {
      let temp = [];
      for (let i = 0; i < reviewsArr.length; i++) {
        if (accept.indexOf(reviewsArr[i].rating) !== -1) {
          temp.push(reviewsArr[i])
        }
      }
      setDisplayedReviews(temp);
    } else {
      setDisplayedReviews(reviewsArr);
    }
  }, [addReviews, filterOptions, sort, reviewsArr])

  return (
    <div className="reviews" >
      <div className="reviewsInteractions">
        <span className="reviewSorter primaryText">
          {displayedReviews.length} reviews, sorted by
          <select name="sort-options" className="sortOptions accentColor primaryText" onChange={sortByHandler}>
            <option value="relevant">relevance</option>
            <option value="newest">newness</option>
            <option value="helpful">helpfulness</option>
          </select>
        </span>
        <button onClick={() => {addReviews()}}> load more reviews test</button>
        <button className="reviewAdder borderColor" onClick={modalHandler}>Write a Review!</button>
      </div>
      <div id="reviewArray" >
        {displayedReviews.length !== 0 &&
        displayedReviews.map(element => <Review review={element} key={element.review_id} setShowModal={setShowModal}/>)}
        <div id="loadMoreDetector"></div>
      </div>
    </div>
  );
}

export default Reviews;