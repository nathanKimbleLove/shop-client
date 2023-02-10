import { useState, useEffect } from 'react';
import axios from 'axios';

import './WriteCharacteristics.scss';

let WriteCharacteristics = ({ product, characteristics, setCharacteristics }) => {

  let [chars, setChars] = useState(null); //MAY Be need for this. this whole component could use a major refactor
  let [charComps, setCharComps] = useState([]);

  let ratingTerms = (char) => {
    if (char === 'Fit' || char === 'Length' || char === 'Size' || char === 'Width') {
      return (<><span>Too small</span><span>Perfect</span><span>Too large</span></>)
    } else if (char === 'Comfort' || char === 'Quality') {
      return (<><span>Poor</span><span>Perfect</span></>)
    }
  }

  let slideHandler = (e) => {
    console.log(e.target.getAttribute('charid'));
    let temp = chars;
    temp[e.target.getAttribute('name')].value = parseFloat(e.target.value);
    setChars(temp);
    characteristics[e.target.getAttribute('charid')] = parseFloat(e.target.value);
    console.log(characteristics);
    setCharacteristics(characteristics);
  }

  useEffect(() => {
    if (product) {
      axios.get(`/reviews/meta?product_id=${product.id}`)
      .then(res => {
        let temp = {};
        for (let char in res.data.characteristics) {
          temp[char] = res.data.characteristics[char];
          temp[char].value = 2.5;
        }
        setChars(temp);
      })
      .catch(err => console.log(err));
    }
  }, [product])

  useEffect(() => {
    let temp = [];
    for(let char in chars) {
      temp.push(
      <div className="char" key={char}>
        <p className="charName">{char}</p>
        <input type="range" name={char} min={1} max={5} step={1} charid={chars[char].id} className="slider" onChange={slideHandler} ></input>
        {ratingTerms(char)}
      </div>)
    }
    setCharComps(temp);
  }, [chars])

  return (
    <div className="photosWrapper">
      <p>Item characteristics</p>
      {charComps}
    </div>
  )
}

export default WriteCharacteristics;