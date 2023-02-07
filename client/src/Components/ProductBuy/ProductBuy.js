import './ProductBuy.scss';
import { useEffect, useState } from 'react';

function ProductBuy({ productStyles }) {

  // whenever the product styles change, recompute the options
  useEffect(() => {
    const productSizes = [];
    for (let item of productStyles) {

    }
  }, [productStyles]);

  const [currentlySelectedStyle, setCurrentlySelectedStyle] = useState(null);

  return (
    <div className="productBuy">

      <select className="sizeSelector" name="" id="">
        <option value="">Select Size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v</option>
        <option value="extra-small">XS</option>
        <option value="small">S</option>
        <option value="medium">M</option>
        <option value="large">L</option>
        <option value="extra-large">XL</option>
      </select>

      <select className="quantity" name="" id="">
        <option value="">Select Quantity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v</option>
        <option value="extra-small">1</option>
        <option value="small">2</option>
        <option value="medium">3</option>
      </select>

      <button>Add to Bag&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+</button>

      <button>☆</button>


    </div>

  );
}

export default ProductBuy;