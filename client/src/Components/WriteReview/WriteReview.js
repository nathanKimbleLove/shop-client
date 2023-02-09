import { useState, useEffect } from 'react';
import axios from 'axios';
import submitReviewHandler from '../../Utils/submitReviewHandler.js'

import './WriteReview.scss'
import WriteReviewPhotos from '../WriteReviewPhotos/WriteReviewPhotos.js';
import WriteCharacteristicsList from '../WriteCharacteristicsList/WriteCharacteristicsList.js';

import { BsStarFill, BsStar} from 'react-icons/bs';

let WriteReview = ({ product, exit }) => {

  let [summary, setSummary] = useState('')
  let [content, setContent] = useState('')
  let [starsNum, setStarsNum] = useState(null);
  let [recommend, setRecommend] = useState(false);
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [photos, setPhotos] = useState([]);
  let [characteristics, setCharacteristics] = useState({});
  let [characterCountText, setCharacterCountText] = useState(<p>review must have at least <em>0</em>/50 charcters</p>);
  let [summaryCount, setSummaryCount] = useState(<p>summary must have at most <em>0</em>/60 charcters</p>);

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
      <button num="0" key={0} onClick={handleStarClick} className="starButton"><BsStar/></button>,
      <button num="1" key={1} onClick={handleStarClick} className="starButton"><BsStar/></button>,
      <button num="2" key={2} onClick={handleStarClick} className="starButton"><BsStar/></button>,
      <button num="3" key={3} onClick={handleStarClick} className="starButton"><BsStar/></button>,
      <button num="4" key={4} onClick={handleStarClick} className="starButton"><BsStar/></button>
    ]);

  let handleSubmit = (e) => {
    e.preventDefault();

    let tempPhotos = [];
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].length > 0) {
        tempPhotos.push(photos[i]);
      }
    }

    const body = {
      product_id: product.id,
      rating: starsNum,
      summary: summary,
      body: content,
      recommend: recommend,
      name: name,
      email: email,
      photos: tempPhotos,
      characteristics: characteristics
    }
    console.log(characteristics);
    let postCheck = submitReviewHandler(body);
    if (postCheck === true) {
      axios.post("http://localhost:8080/reviews", body)
      .then(res => {
        console.log(res);
        exit();
      })
      .catch(err => console.log(err.config.data));
    } else {
      for (let i = 0; i < postCheck.length; i++) {
        document.querySelector(postCheck[i]).classList.add("unacceptable");
        setTimeout(() => {document.querySelector(postCheck[i]).classList.remove("unacceptable");}, 3500);
      }
    }

  }

  useEffect(() => {
    if (content.length < 50) {
      setCharacterCountText(<p>review must have at least <em>{content.length}</em>/50 charcters</p>)
    } else {
      setCharacterCountText(<p>review must have at most <em>{content.length}</em>/1000 charcters</p>)
    }
  }, [content])

  useEffect(() => {
    if (content.length <= 60) {
      setSummaryCount(<p>summary must have at most <em>{summary.length}</em>/60 charcters</p>)
    } else {
      setSummaryCount(<p>summary must have at most <em>{summary.length}</em>/60 charcters</p>)
    }
  }, [summary])

  return (
    <form className="WriteReview">
      <div className="writeTopbar">
        <div className="writeReviewStars" id="rating">
          {stars}
        </div>
        <div className="writeUserInfo">
          <input type="text" className="writeName" id="name" placeholder="Your Name" onChange={e => {setName(e.target.value)}}></input>
          <input type="text" className="writeEmail" id="email" placeholder="Your Email" onChange={e => {setEmail(e.target.value)}}></input>
        </div>
      </div>
      <div className="writeMidbar">
        <input type="text" className="writeReviewSummary primaryText" id="summary" placeholder="A clever summary" onChange={e => {setSummary(e.target.value)}}></input>
        <span>
          Recommend?
          <input type="checkbox" id="recommend" name="recommend" value="recommend" onChange={e => setRecommend(e.target.checked)}></input>
        </span>
      </div>
      {summaryCount}
      <textarea rows="rows" className="writeReviewContent" id="body" placeholder="This item was almost perfect, but ..." onChange={e => {setContent(e.target.value)}}></textarea>
      {characterCountText}
      <div className="writeBottombar">
        <WriteCharacteristicsList product={product} characteristics={characteristics} setCharacteristics={setCharacteristics}/>
        <WriteReviewPhotos photos={photos} setPhotos={setPhotos} />
        <input type="submit" className="submission" value="Share your review!" onClick={handleSubmit} ></input>
      </div>
    </form>
  )
}

export default WriteReview;

/* add to scss

@keyframes shake {
  0% {
    color: red;
    border-color: red;
  }

  2.5%, 22.5% {
    transform: translate3d(-1px, 0, 0);
  }

  5%, 20% {
    transform: translate3d(2px, 0, 0);
  }

  7.5%, 12.5%, 17.5% {
    transform: translate3d(-4px, 0, 0);
  }

  10%, 15% {
    transform: translate3d(4px, 0, 0);
  }

  70% {
    color: red;
  }
}

.unacceptable {
  animation: shake 3.3s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

*/