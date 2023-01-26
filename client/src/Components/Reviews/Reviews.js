import './Reviews.css';
import Review from '../Review/Review.js'
function Reviews() {


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
        <button className="reviewAdder borderColor">Write a Review!</button>
      </div>
      <div className="reviewArray">
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </div>
  );
}

export default Reviews;