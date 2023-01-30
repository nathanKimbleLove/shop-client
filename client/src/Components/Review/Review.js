import './Review.css';

import { BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsMegaphoneFill } from 'react-icons/bs'

function Review() {


  return (
    <div className="review borderColor">
      <div className= "reviewTopBar">
        <span><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf /><BsStar /></span>
        <span className="secondaryTextColor">@random-a-username, June 27th, 2002</span>
      </div>
      <div className="reviewTitle primaryText">I am the very, very, ve...</div>
      <div className="reviewContent">...ry long title. <br></br>so that's all folks. Have an excellent day, and I'll see ya when I see ya!!! </div>
      <div className="reviewBottomBar">
        <button className="heartOutline"><AiOutlineHeart /></button>
        <button className="report"><BsMegaphoneFill /></button>
      </div>
    </div>
  );
}

export default Review;

// long content for testing later
/*
I wish that it wasn't so long, fr. I am going to write a whole lot of content here just to see what it looks like. I'm not really sure what my solution will be, should any problems arise. I guess we'll cross that bridge when we get to it. Hopefully it won't look to bad. <br></br><br></br> Anyway, I had a pretty good day, hbu?
*/