import axios from 'axios';
import ProductDetails from './Components/ProductDetails/ProductDetails.js';
import RatingsAndReviews from './Components/RatingsAndReviews/RatingsAndReviews.js';
import QuestionsAndAnswers from './Components/QuestionsAndAnswers/QuestionsAndAnswers.js';


function App() {

  let query = 'products'
  let options = { headers: { "Authorization": process.env.REACT_APP_AUTH }}
  axios.get(process.env.REACT_APP_API + query, options)
  .then(res => console.log(res.data));


  return (
    <div>
      Welcome to our app!
      <ProductDetails />
      <RatingsAndReviews />
      <QuestionsAndAnswers />
    </div>
  );
}

// this is Neb testing if I can push and pull from the remote repo
export default App;
