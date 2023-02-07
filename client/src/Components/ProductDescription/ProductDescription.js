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
          href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20product!%20${getProductDescription()}`}>
      <AiFillTwitterCircle />
      </a>

      <a className="socialMediaButton"
          href="https://www.pinterest.com/pin/create/link/?url=localhost:3000">

      <BsPinterest />
      </a>
    </div>
  )
}

export default ProductDescription;