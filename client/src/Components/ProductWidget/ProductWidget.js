import './ProductWidget.scss';
import ProductDecription from '../ProductDescription/ProductDescription.js';
import ProductOptions from '../ProductOptions/ProductOptions.js';
import ProductPerks from '../ProductPerks/ProductPerks.js';
import ProductPhotos from '../ProductPhotos/ProductPhotos.js';
import axios from 'axios';
import { useEffect, useState } from 'react';


function ProductDetails({ product }) {
  const [productStyles, setProductStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null); // this should be an id
  const [selectedStylePhotoUrls, setSelectedStylePhotoUrls] = useState([]);

  // whenecver the styles change, change available photo urls
  useEffect(() => {
    if (productStyles.length === 0) return;

    const productPhotos = [];

    for (let product of productStyles) {
      if (product.style_id === selectedStyle) {
        console.log(product.photos);
        for (let photo of product.photos) {
          productPhotos.push(photo.url);
        }
      }
    }
    // console.log(productPhotos);
    setSelectedStylePhotoUrls(productPhotos);

  }, [productStyles, selectedStyle]);

  // whenever all of the product styles change (new product), set the selected one to be the first product style
  useEffect(() => {
    if (productStyles.length !== 0) {
      setSelectedStyle(productStyles[0].style_id);
      console.log(productStyles)
      }
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
      <ProductPhotos productPhotos={selectedStylePhotoUrls} />
      <ProductOptions
        product={product}
        productStyles={productStyles}
        setSelectedStyle={setSelectedStyle}
        selectedStyle={selectedStyle}
      />
      <ProductDecription product={product} />
      <ProductPerks />
    </div>
  );
}

export default ProductDetails;
