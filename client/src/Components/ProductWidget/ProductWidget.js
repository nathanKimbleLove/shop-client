import './ProductWidget.scss';
import ProductDecription from '../ProductDescription/ProductDescription.js';
import ProductOptions from '../ProductOptions/ProductOptions.js';
import ProductPerks from '../ProductPerks/ProductPerks.js';
import ProductPhotos from '../ProductPhotos/ProductPhotos.js';
import axios from 'axios';
import { useEffect, useState } from 'react';


function ProductDetails({ product }) {
  const [productStyles, setProductStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productSizes, setProductSizes] = useState([]);

  // whenever all of the product styles change (new product), set the selected one to be the first product style
  useEffect(() => {
    setSelectedStyle(productStyles[0]);
  }, [productStyles]);

  useEffect(() => {
    if (product) {
      axios
        .get(`http://localhost:8080/products/${product.id}/styles`)
       .then((res) => {
        // console.log('product details use effect results:');
        //  console.log(res.data.results); // the 6 items
         setProductStyles(res.data.results);
          })
       .catch((err) => {
          console.log('product details use effect error:');
          console.log(err);
        });
    }
  }, [product]);

  // useEffect(() => {
  //   console.log('selected style: ', selectedStyle);
  // }, [selectedStyle]);

  return (
    <div className="productWidget">
      <ProductPhotos />
      <ProductOptions
        product={product}
        productStyles={productStyles}
        setSelectedStyle={setSelectedStyle}
      />
      <ProductDecription product={product} />
      <ProductPerks />
    </div>
  );
}

export default ProductDetails;
