import axios from "axios";
import { useState, useEffect } from "react";

import ProductWidget from "./Components/ProductWidget/ProductWidget.js";
import RatingsAndReviews from "./Components/RatingsAndReviews/RatingsAndReviews.js";
import QuestionsAndAnswers from "./Components/QuestionsAndAnswers/QuestionsAndAnswers.js";
import NavBar from "./Components/NavBar/NavBar.js";
import Modal from "./Components/Modal/Modal.js";

import prependRequests from "./Utils/prependRequests.js";

function App() {
  const [product, setProduct] = useState(null);
  const [modal, setModal] = useState(<></>);
  const [user, setUser] = useState(undefined);

  let setShowModal = (comp, content) => {
    setModal(
      <Modal
        serve={comp}
        content={content}
        setModal={setModal}
        setUser={setUser}
        globalProduct={product}
      />
    );
  };

  let callForProducts = (cb) => {
    return new Promise((res, rej) => {
      const rand = Math.ceil(Math.random() * 1011);
      axios
        .get(prependRequests() + `/products/?page=${rand}&count=1`)
        .then((resp) => {
          res(resp.data[0])
        })
        .catch((err) => rej(err));
    });
  }

  useEffect(() => {
    callForProducts()
    .then(product => setProduct(product))
    .catch(err => console.log(err))
  }, []);

  const handleChangeProduct = () => {
    callForProducts()
    .then(product => {
      setProduct(product);
      axios
        .get(prependRequests() + "/qa/questions?product_id=" + product.id)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    })
  };

  return (
    <>
      {modal}
      <NavBar changeProduct={handleChangeProduct} />
      <ProductWidget product={product} />
      <QuestionsAndAnswers
        product={product}
        setShowModal={setShowModal}
        user={user}
        setUser={setUser}
      />
      <RatingsAndReviews product={product} setShowModal={setShowModal} />
      <p className="accentColor">Current Product is {JSON.stringify(product)}</p>
    </>
  );
}

export default App;
