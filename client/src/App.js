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
    axios.get('http://localhost:8080/products'/*, { body: 'What is a chicken?', name: 'Jimothy' }*/)
    .then(res => {
      console.log(res);
      setProducts(res.data);
      setProduct(products[0]); //fix this
    })
    .catch(err => console.log(err));
  }, [])

  const changeProduct = () => {
    const random = Math.floor(Math.random() * products.length);
    setProduct(products[random]);
  }

  return (
    <>
      <NavBar changeProduct={changeProduct}/>
      <ProductDetails product={product} />
      <QuestionsAndAnswers product={product} />
      <RatingsAndReviews product={product} />
      <p className="secondaryTextColor">Current Product is {JSON.stringify(product)}</p>
    </>
  );
}

// this is Neb testing if I can push and pull from the remote repo
export default App;
