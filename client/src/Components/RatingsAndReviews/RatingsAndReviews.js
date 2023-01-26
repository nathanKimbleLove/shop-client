import './RatingsAndReviews.css';
import RatingsBreakdown from '../RatingsBreakdown/RatingsBreakdown.js';
import Reviews from '../Reviews/Reviews.js';

function RatingsAndReviews() {

  return (
    <div className="ratingsAndReviews">
      <RatingsBreakdown />
      <Reviews />
    </div>
  );
}

export default RatingsAndReviews;