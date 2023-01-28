import { useState, useEffect} from 'react';

import { IoMdArrowDropdown } from 'react-icons/io';

import './BarRatings.css'

function BarRatings({ data, dataName })  {


  let movePointer = (char) => {
    if(data) {
      let num = data.value;
      let temp = (num * 85 /4)
      console.log(temp);
      return {"paddingLeft": `${temp}%`}
    }
  }

  let ratingTerms = () => {
    if (dataName === 'Fit' || dataName === 'Length') {
      return (
      <>
        <span>Too small</span><span>Perfect</span><span>Too large</span>
      </>
      )
    } else if (dataName === 'Comfort' || dataName === 'Quality') {
      return (
      <>
        <span>Poor</span><span>Perfect</span>
      </>
      )
    }
  }

  return (
    <div>
        <span className="sizeBarRatings spacing">{dataName}:</span>
        <div className="pointer" style={movePointer(dataName)}><IoMdArrowDropdown /></div>
        <div className="sizeBar"></div>
        <div className="sizeBarRatings">
          {ratingTerms()}
        </div>
      </div>
  );
}

export default BarRatings;