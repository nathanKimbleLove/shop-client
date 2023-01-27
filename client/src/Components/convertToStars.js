import { BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';

let convertToStars = (num, classes) => {
  const returnSpan = [];
  const halves = Math.round(num * 2);

  let i = halves;
  let j = 10
  while (i>=2) {
    returnSpan.push(<BsStarFill />)
    i -= 2;
    j -= 2;
  }
  if ((i % 2)) {
    returnSpan.push(<BsStarHalf />);
    j -= 2;
  }
  while (j > 0) {
    returnSpan.push(<BsStar />);
    j -= 2;
  }

  return <>{returnSpan}</>
}

export default convertToStars;