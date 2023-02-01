import { useState, useEffect } from 'react';
import axios from 'axios';

import './WriteReview.css'
import WriteReviewPhotos from '../WriteReviewPhotos/WriteReviewPhotos.js';
import WriteCharacteristics from '../WriteCharacteristics/WriteCharacteristics.js';

import { BsStarFill, BsStar} from 'react-icons/bs';

let WriteReview = ({ product, exit }) => {

  let [title, setTitle] = useState('')
  let [content, setContent] = useState('')
  let [starsNum, setStarsNum] = useState(1);
  let [recommend, setRecommend] = useState(false);
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [photos, setPhotos] = useState([]);
  let [characteristics, setCharacteristics] = useState({});

  let handleStarClick = (e) => {
    e.preventDefault();
    let num = e.target.getAttribute('num')
    setStarsNum(parseInt(num)+1);
    let temp = [...stars];
    for (let i = 0; i <= num; i++) {
      temp[i] = <button num={i} key={i} onClick={handleStarClick} className="starButton"><BsStarFill/></button>
    }
    for (let i = 4; i > num; i--) {
      temp[i] = <button num={i} key={i} onClick={handleStarClick} className="starButton"><BsStar/></button>
    }
    setStars(temp);
  }

  // onClick event hits svg and that is not good
  let [stars, setStars] = useState(
    [
      <button num="0" key={0} onClick={handleStarClick} className="starButton"><BsStarFill/></button>,
      <button num="1" key={1} onClick={handleStarClick} className="starButton"><BsStar/></button>,
      <button num="2" key={2} onClick={handleStarClick} className="starButton"><BsStar/></button>,
      <button num="3" key={3} onClick={handleStarClick} className="starButton"><BsStar/></button>,
      <button num="4" key={4} onClick={handleStarClick} className="starButton"><BsStar/></button>
    ]);

  let handleSubmit = (e) => {
    e.preventDefault();
    if ( title && content && name && email) {
      const body = {
        product_id: product.id,
        rating: starsNum,
        summary: title,
        body: content,
        recommend: recommend,
        name: name,
        email: email,
        photos: photos,
        characteristics: characteristics
      }
      axios.post("http://localhost:8080/reviews", body)
      .then(res => {
        console.log(res);
        exit();
      })
      .catch(err => console.log(err));
    }

  }

  return (
    <form className="WriteReview">
      <div className="writeTopbar">
        <div className="writeReviewStars">
          {stars}
        </div>
        <div className="writeUserInfo">
          <input type="text" className="writeName" placeholder="Your Name" onChange={e => {setName(e.target.value)}}></input>
          <input type="text" className="writeEmail" placeholder="Your Email" onChange={e => {setEmail(e.target.value)}}></input>
        </div>
      </div>
      <div className="writeMidbar">
        <input type="text" className="writeReviewTitle primaryText" placeholder="A clever title" onChange={e => {setTitle(e.target.value)}}></input>
        <span>
          Recommend?
          <input type="checkbox" id="recommend" name="recommend" value="recommend" onChange={e => setRecommend(e.target.checked)}></input>
        </span>
      </div>
      <textarea rows="rows" className="writeReviewContent" placeholder="This item was almost perfect, but ..." onChange={e => {setContent(e.target.value)}}></textarea>
      <div className="writeBottombar">
        <WriteReviewPhotos photos={photos} setPhotos={setPhotos} />
        <WriteCharacteristics product={product} characteristics={characteristics} setCharacteristics={setCharacteristics}/>
        <input type="submit" className="submission" value="Share your review!" onClick={handleSubmit} ></input>
      </div>
    </form>
  )
}

export default WriteReview;