import './ProductBuy.scss';
import { useEffect, useState } from 'react';

function ProductBuy({ productStyles, skus }) {

  const [sizeOptions, setSizeOptions] = useState(<option value=""></option>);
  const [quantityOptions, setQuantityOptions] = useState(<option value=""></option>);
  const [selectedSize, setSelectedSize] = useState(null);
  const [maxQuantity, setMaxQuantity] = useState(0);

  // skus: {"1281169":{"quantity":14,"size":"7"},"1281170":{"quantity":25,"size":"7.5"},"1281171":{"quantity":9,"size":"8"},"1281172":{"quantity":2,"size":"8.5"},"1281173":{"quantity":18,"size":"9"},"1281174":{"quantity":12,"size":"9.5"},"1281175":{"quantity":10,"size":"10"},"1281176":{"quantity":18,"size":"10.5"},"1281177":{"quantity":11,"size":"11"},"1281178":{"quantity":35,"size":"11.5"},"1281179":{"quantity":25,"size":"12"}}

  function handleChange(event) {
    setSelectedSize(event.target.value);
  }

  // whenever the max quantity chnages, change quantity options
  useEffect(() => {
    const quantityOptions = [];
    for (let i = 1; i <= Math.min(maxQuantity, 15); i++) {
      quantityOptions.push(<option value={i}>{i}</option>);
    }
    setQuantityOptions(quantityOptions);
  }, [maxQuantity]);

  // whenever the skus change, change the selectors
  useEffect(() => {
    const productSizes = [];

    for (let key in skus) {
      productSizes.push(skus[key].size);
    }

    const sizeOptionsChain = [(<option value="">Select Size</option>)];
    for (let size of productSizes) {
      sizeOptionsChain.push(<option value={size}>{size}</option>);
    }

    setSizeOptions(sizeOptionsChain);

    for (let key in skus) {
      if (skus[key].size === selectedSize) {
        setMaxQuantity(skus[key].quantity)
        console.log(skus[key].quantity)

      }
    }


  }, [skus, selectedSize]);


  return (
    <div className="productBuy">

      <select className="sizeSelector" name="" id="" onChange={handleChange}>
        {sizeOptions}
      </select>

      <select className="quantity" name="" id="">
        {quantityOptions}
      </select>

      <button className="addToBag">Add to Bag</button>

      <button className="star">☆</button>


    </div>

  );
}

export default ProductBuy;