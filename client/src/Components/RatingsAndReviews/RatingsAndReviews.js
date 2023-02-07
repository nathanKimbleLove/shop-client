import { useState, useEffect } from 'react';

import './RatingsAndReviews.scss';
import RatingsBreakdown from '../RatingsBreakdown/RatingsBreakdown.js';
import Reviews from '../Reviews/Reviews.js';


//on mount we NEED::
  // give Reviews component an array of reviews
  //give RatingsBreakdown review meta data?

function RatingsAndReviews({product, setShowModal}) {

  let [filterOptions, setFilterOptions] = useState({1: false, 2: false, 3: false, 4: false, 5: false})

  return (
    <div className="BIGDIV" id="ratingsScrollFromProduct">
      <h4>RATINGS & REVIEWS</h4>
      <div className="ratingsAndReviews">
        <RatingsBreakdown product={product} filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>
        <Reviews product={product} setShowModal={setShowModal} filterOptions={filterOptions}/>
      </div>
    </div>
  );
}

export default RatingsAndReviews;