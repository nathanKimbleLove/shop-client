import axios from 'axios';

function App() {

  let query = 'products'
  let options = { headers: { "Authorization": process.env.REACT_APP_AUTH }}
  axios.get(process.env.REACT_APP_API + query, options)
  .then(res => console.log(res.data));


  return (
    <div>
     Welcome to our app!
    </div>
  );
}

// this is Neb testing if I can push and pull from the remote repo
export default App;
