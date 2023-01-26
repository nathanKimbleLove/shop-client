import './RatingsAndReviews.css';
import RatingsBreakdown from '../RatingsBreakdown/RatingsBreakdown.js';
import Reviews from '../Reviews/Reviews.js';

function RatingsAndReviews() {

  return (
    <div>
      <h4>RATINGS & REVIEWS</h4>
      <div className="ratingsAndReviews">
        <RatingsBreakdown />
        <Reviews />
      </div>
    </div>
  );
}

export default RatingsAndReviews;