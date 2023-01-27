import './RatingsBreakdown.css';
import { BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';

function RatingsBreakdown({id}) {

  return (
    <div className="ratingsBreakdown">
      <div className="averageStars">
        <span className="primaryText averageStarsNumber">1.5</span>
        <span className="averageStarsStars"><BsStarFill /><BsStarHalf /><BsStar /><BsStar /><BsStar /></span>
      </div>
      <div className="starCounts">
        <div className="stars"><button className="starFilter ">5 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={{'width': '100%'}}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter">4 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={{'width': '90%'}}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter">3 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={{'width': '40%'}}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter">2 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={{'width': '30%'}}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter">1 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={{'width': '62%'}}></div>
          </div>
        </div>
      </div>
      <div>
        <span className="sizeBarRatings spacing">Size ratings:</span>
        <div className="pointer" style={{"paddingLeft": "23%"}}><IoMdArrowDropdown /></div>
        <div className="sizeBar"></div>
        <div className="sizeBarRatings">
          <span>Too small</span><span>Perfect</span><span>Too large</span>
        </div>
      </div>
      <div>
        <span className="sizeBarRatings spacing">Comfort ratings:</span>
        <div className="pointer" style={{"padding-left": "45%"}}><IoMdArrowDropdown /></div>
        <div className="sizeBar"></div>
        <div className="sizeBarRatings">
          <span>Poor</span><span>Perfect</span>
        </div>
      </div>
    </div>
  );
}

export default RatingsBreakdown;