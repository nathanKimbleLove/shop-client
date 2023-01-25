import axios from 'axios';
import ProductDetails from './Components/ProductDetails/ProductDetails.js';
import RatingsAndReviews from './Components/RatingsAndReviews/RatingsAndReviews.js';
import QuestionsAndAnswers from './Components/QuestionsAndAnswers/QuestionsAndAnswers.js';
import NavBar from './Components/NavBar/NavBar.js';
import { useState, useEffect } from 'react';

function App() {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then(res => {
        console.log(res);
        const clothing = res.data;

        setProducts(clothing);
        const random = Math.floor(Math.random() * clothing.length);
        setProduct(clothing[random]);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChangeProduct = () => {
    const random = Math.floor(Math.random() * products.length);
    setProduct(products[random]);
  };

  return (
    <>
      <NavBar changeProduct={handleChangeProduct}/>
      <ProductDetails product={product} />
      <QuestionsAndAnswers product={product} />
      <RatingsAndReviews product={product} />
      <p className="secondaryTextColor">Current Product is {JSON.stringify(product)}</p>
    </>
  );
}

export default App;
