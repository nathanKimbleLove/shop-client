import { useState, useEffect } from 'react';
import axios from 'axios';

import './WriteCharacteristicsList.scss';
import WriteCharacteristic from '../WriteCharacteristic/WriteCharacteristic.js'

let WriteCharacteristicsList = ({ product, characteristics, setCharacteristics }) => {

  let charObj = {
    Size: ['A size too small', 'Half a size too small', 'Perfect', 'Half a size too large', 'A size too large'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Okay', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  let [chars, setChars] = useState(null);
  let [charComponents, setCharComponents] = useState([]);

  useEffect(() => {
    if (product) {
      axios.get(`http://localhost:8080/reviews/meta?product_id=${product.id}`)
      .then(res => {
        let temp = {};
        for (let char in res.data.characteristics) {
          temp[char] = res.data.characteristics[char].id;
        }
        setChars(temp);
      })
      .catch(err => console.log(err));
    }
  }, [product])

  useEffect(() => {
    let temp = [];
    for(let char in chars) {
      temp.push([char, chars[char]])
    }
    setCharComponents(temp);
  }, [chars])

  return (
    <div className="characteristicsList">
      {charComponents.map(char => {
        return <WriteCharacteristic key={char[0]} characteristic={char[0]} characteristicId={char[1]} charObj={charObj} characteristics={characteristics} setCharacteristics={setCharacteristics} />
      })}
    </div>
  )
}

export default WriteCharacteristicsList;