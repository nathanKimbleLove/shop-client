import { useState, useEffect} from 'react';

import './StarCounts.css'

function StarCounts({ data })  {

  let calculateTotal = () => {
    let totalRatings = 0;
    for (let key in data) {
      totalRatings += parseInt(data[key]);
    }
    return totalRatings;
  }

  let barCalculator = (key) => {
    let percent = Math.round(data[key] * 100 / calculateTotal());
    return {"width": percent + '%'}
  }





  return (
    <div className="starCounts">
        <div className="stars"><button className="starFilter ">5 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={barCalculator(5)}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter">4 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={barCalculator(4)}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter">3 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={barCalculator(3)}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter">2 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={barCalculator(2)}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter">1 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={barCalculator(1)}></div>
          </div>
        </div>
      </div>
  );
}

export default StarCounts;