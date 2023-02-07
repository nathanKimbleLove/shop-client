import { useState, useEffect } from 'react';

import './WriteCharacteristic.scss';

let WriteCharacteristic = ({ characteristic, characteristicId, charObj, characteristics, setCharacteristics }) => {

  let [charDisplay, setCharDisplay] = useState('')

  let slideHandler = (e) => {
    let name = e.target.getAttribute('name')
    let val = parseFloat(e.target.value)

    let tempChars = {...characteristics};
    tempChars[characteristicId] = val;
    setCharacteristics(tempChars);

    setCharDisplay(charObj[name][val - 1]);
  }

  return (
    <div className="characteristic" key={characteristic}>
      <p className="characteristicName">{characteristic}</p>
      <input type="range" name={characteristic} min={1} max={5} step={1} characteristicid={characteristic} className="slider" onChange={slideHandler}></input>
      <p className="characteristicDescriptor" >{charDisplay}</p>
    </div>
  )
}

export default WriteCharacteristic;