import { useState, useEffect } from 'react';

import './RatingsAndReviews.css';
import RatingsBreakdown from '../RatingsBreakdown/RatingsBreakdown.js';
import Reviews from '../Reviews/Reviews.js';


//on mount we NEED::
  // give Reviews component an array of reviews
  //give RatingsBreakdown review meta data?

function RatingsAndReviews({product, setShowModal}) {

  let [divs, setDivs] = useState(<></>)

  useEffect(() => {
    if(product) {
      setDivs(<>
      <RatingsBreakdown product={product} />
      <Reviews product={product} setShowModal={setShowModal}/>
      </>)
    }
  }, [product])

  return (
    <div className="BIGDIV">
      <h4>RATINGS & REVIEWS</h4>
      <div className="ratingsAndReviews">
        {divs}
      </div>
    </div>
  );
}

export default RatingsAndReviews;