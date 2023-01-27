import { useState, useEffect } from 'react';

import './RatingsAndReviews.css';
import RatingsBreakdown from '../RatingsBreakdown/RatingsBreakdown.js';
import Reviews from '../Reviews/Reviews.js';


//on mount we NEED::
  // give Reviews component an array of reviews
  //give RatingsBreakdown review meta data?

function RatingsAndReviews({product}) {

  return (
    <div>
      <h4>RATINGS & REVIEWS</h4>
      <div className="ratingsAndReviews">
        <RatingsBreakdown product={product} />
        <Reviews product={product} />
      </div>
    </div>
  );
}

export default RatingsAndReviews;