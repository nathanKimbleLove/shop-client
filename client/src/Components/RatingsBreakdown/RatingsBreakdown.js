import { useEffect, useState } from 'react';
import axios from 'axios';

import './RatingsBreakdown.css';
import StarCounts from '../StarCounts/StarCounts.js'
import BarRatings from '../BarRatings/BarRatings.js'
import convertToStars from '../convertToStars.js'

import { BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';


function RatingsBreakdown({product}) {

  let [breakDown, setBreakDown] = useState(<></>)

  const calculateStars = (ratings) => {
    //takes in ratings object

   let keys = Object.keys(ratings);
   let total = 0;
   let sum = 0;

   for (let i = 0; i < keys.length; i++) {
     let num = parseInt(ratings[keys[i]])
     total += num;
     sum += keys[i] * num;
   }
   let returnVal = Math.round(2 * sum/total) / 2;
   return returnVal;

    //spits out average score to the nearest half
  }


  useEffect(() => {
    axios.get(`http://localhost:8080/reviews/meta?product_id=${product.id}`)
    .then(res => {
      let tempNum = calculateStars(res.data.ratings);

      let chars = res.data.characteristics
      let keys = Object.keys(chars);
      let charMap = [];
      for (let i = 0; i < keys.length; i++) {
        charMap.push(<BarRatings data={chars[keys[i]]} dataName={keys[i]} key={keys[i]} />)
      }

      setBreakDown(<>
      <div className="averageStars">
        <span className="primaryText averageStarsNumber">{tempNum}</span>
        <span className="averageStarsStars">{convertToStars(tempNum)}</span>
      </div>
      <StarCounts data={res.data.ratings}/>
      {charMap}
      </>)

    })
  }, [product])

  return (
    <div className="ratingsBreakdown">
    {breakDown}
    </div>
  );
}

export default RatingsBreakdown;
