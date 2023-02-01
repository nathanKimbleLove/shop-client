import './ProductDescription.css';

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
    </div>
  )
}

export default ProductDescription;