import './RatingsBreakdown.css';

function RatingsBreakdown() {

  return (
    <div className="ratingsBreakdown">
      <div className="stars">
        <h2>5.75 stars!</h2>
      </div>
      <div className="starCounts">
        <div>5 stars: 100</div>
        <div>4 stars: 50</div>
        <div>3 stars: 9</div>
        <div>2 stars: 8</div>
        <div>1 star: 1200</div>
      </div>
      <div className="sizeBar" >size
        <div>======================</div>
      </div>
      <div className="comfortBar" >comfort
        <div>======================</div>
      </div>
    </div>
  );
}

export default RatingsBreakdown;