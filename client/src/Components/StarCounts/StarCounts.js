import { useState, useEffect} from 'react';

import './StarCounts.css'

function StarCounts({ data, filterOptions, setFilterOptions })  {

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

  let filterHandler = (e) => {
    let et = e.target
    let num = et.getAttribute('name');
    let temp = {};
    for (let num in filterOptions) {
      temp[num] = filterOptions[num];
    }
    if (et.classList.contains('false')) {
      temp[num] = true;
      et.classList.remove('false');
      et.classList.add('true');
    } else {
      temp[num] = false;
      et.classList.remove('true');
      et.classList.add('false');
    }
    setFilterOptions(temp);
  }

  return (
    <div className="starCounts">
        <div className="stars"><button className="starFilter false" name="5" onClick={filterHandler}>5 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={barCalculator(5)}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter false" name="4" onClick={filterHandler}>4 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={barCalculator(4)}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter false" name="3" onClick={filterHandler}>3 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={barCalculator(3)}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter false" name="2" onClick={filterHandler}>2 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={barCalculator(2)}></div>
          </div>
        </div>
        <div className="stars"><button className="starFilter false" name="1" onClick={filterHandler}>1 stars</button>
          <div className="emptyBar">
            <div className="fullBar" style={barCalculator(1)}></div>
          </div>
        </div>
      </div>
  );
}

export default StarCounts;