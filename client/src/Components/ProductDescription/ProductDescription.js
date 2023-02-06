import './ProductDescription.scss';
import { BsFacebook, BsPinterest } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';

function ProductDescription({ product }) {
  const getProductSlogan = () => {
    if (product === null) {
      return
    }
    else {
      return product.slogan;
    }
  };

  const getProductDescription = () => {
    if (product === null) {
      return
    }
    else {
      return product.description;
    }
  };


  return (
    <div className="productDescription">
      <h3>
        {getProductSlogan()}
      </h3>
      <p>
        {getProductDescription()}
      </p>
      <a className="socialMediaButton"
          href="https://www.facebook.com">
      <BsFacebook />
      </a>

      <a className="socialMediaButton"
          href="https://www.twitter.com">
      <AiFillTwitterCircle />
      </a>

      <a className="socialMediaButton"
          href="https://www.pinterest.com">

      <BsPinterest />
      </a>
    </div>
  )
}

export default ProductDescription;