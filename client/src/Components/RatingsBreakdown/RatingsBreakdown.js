import { useEffect, useState } from 'react';
import axios from 'axios';

import './RatingsBreakdown.scss';
import StarCounts from '../StarCounts/StarCounts.js'
import BarRatings from '../BarRatings/BarRatings.js'
import convertToStars from '../../Utils/convertToStars.js'

import prependRequests from '../../Utils/prependRequests.js';

import { BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';

function RatingsBreakdown({ product, filterOptions, setFilterOptions }) {


  let [breakDown, setBreakDown] = useState(<></>)
  let [characteristicsArray, setCharacteristicsArray] = useState([]);
  let [recoPercent, setRecoPercent] = useState(0);
  let [averageRating, setAverageRating] = useState(2.5);

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
   let returnVal = Math.round(10 * sum/total) / 10;
   return returnVal;

    //spits out average score to the nearest half
  }

  let calculateReco = (data) => {
    let ratio = (parseInt(data.true) / (parseInt(data.true) + parseInt(data.false)))
    setRecoPercent(Math.round(100 * ratio))
  }

  useEffect(() => {
    if (product) {
      axios.get(prependRequests() + `/reviews/meta?product_id=${product.id}`)
      .then(res => {
        setAverageRating(calculateStars(res.data.ratings));

        let chars = res.data.characteristics
        let keys = Object.keys(chars);
        let charMap = [];
        for (let i = 0; i < keys.length; i++) {
          charMap.push(<BarRatings data={chars[keys[i]]} dataName={keys[i]} key={keys[i]} />)
        }
        setCharacteristicsArray(charMap)
        calculateReco(res.data.recommended)

        setBreakDown(<>
        <StarCounts data={res.data.ratings} filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>
        </>)
      })
    }
  }, [product, filterOptions])

  return (
    <div className="ratingsBreakdown">
      <div className="averageStars">
        <span className="primaryText averageStarsNumber">{averageRating}</span>
        <span className="averageStarsStars">{convertToStars(averageRating)}</span>
      </div>
    {breakDown}
    <div>
      {recoPercent}% of reviewers recommend this product.
    </div>
    {characteristicsArray}
    </div>
  );
}

export default RatingsBreakdown;
