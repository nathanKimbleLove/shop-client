import { useState, useEffect } from 'react';

import './WriteReviewPhotos.css';

let WriteReviewPhotos = ({ photos, setPhotos }) => {

  let [incrementKey, setIncrementKey] = useState(-1);
  let [photoInputs, setPhotoInputs] = useState([])

  let updatePhotos = (e) => {
    let i = e.target.getAttribute('name');
    let temp = [...photos];
    temp[i] = e.target.value;
    setPhotos(temp);
  }

  let addImageHandler = (e) => {
    e.preventDefault();
    let temp = [...photoInputs, <input type="text" className="photoInputs" placeholder="photo url" key={incrementKey} name={incrementKey} onChange={updatePhotos}></input>]
    setPhotoInputs(temp);
  }

  useEffect(() => {
    setIncrementKey(incrementKey + 1);
  }, [photoInputs])

  return (
    <div className="photosWrapper">
      <p>Add image urls</p>
      {photoInputs}
      <button onClick={addImageHandler}>+</button>
    </div>
  )
}

export default WriteReviewPhotos;