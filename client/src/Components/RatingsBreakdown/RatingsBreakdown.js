import './RatingsBreakdown.css';
import { BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';


function RatingsBreakdown() {

  return (
    <div className="ratingsBreakdown">
      <div className="stars">
        <span>1.5</span>
        <span><BsStarFill /><BsStarHalf /><BsStar /><BsStar /><BsStar /></span>
      </div>
      <div className="starCounts">
        <div><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /> 100</div>
        <div><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStar /> 50</div>
        <div><BsStarFill /><BsStarFill /><BsStarFill /><BsStar /><BsStar /> 9</div>
        <div><BsStarFill /><BsStarFill /><BsStar /><BsStar /><BsStar /> 8</div>
        <div><BsStarFill /><BsStar /><BsStar /><BsStar /><BsStar /> 1200</div>
      </div>
      <div className="sizeBar" >size { /*WE WILL USE TWO SVGs AND USE A VAR TO TRANSFORM THE POINTER ACCURATELY */ }
        <div>======================</div>
      </div>
      <div className="comfortBar" >comfort
        <div>======================</div>
      </div>
    </div>
  );
}

export default RatingsBreakdown;