import './ProductHeader.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import convertToStars from '../../Utils/convertToStars';
import calculateStars from '../../Utils/calculateStars';

function ProductHeader({ product }) {
  const [totalRatings, setTotalRatings] = useState(null);
  const [ratingStars, setRatingStars] = useState(0);


  useEffect(() => {
    if (product) {
      axios.get(`http://localhost:8080/reviews/meta?product_id=${product.id}`)
        .then(res => {
          setRatingStars(calculateStars(res.data.ratings));
        })
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      axios
        .get(`http://localhost:8080/reviews/meta?product_id=${product.id}`)
        .then((res) => {
          let summedRatings = 0;
          for (let key in res.data.ratings) {
            summedRatings += parseInt(res.data.ratings[key]);
          }
          setTotalRatings(summedRatings);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [product]);

  const getProductName = () => {
    if (product === null) {
      return;
    } else {
      return product.name;
    }
  };

  const getProductCategory = () => {
    if (product === null) {
      return;
    } else {
      return product.category;
    }
  };

  const getProductPrice = () => {
    if (product === null) {
      return;
    } else {
      return product.default_price;
    }
  };

  return (
    <div className="productHeader">

      {totalRatings > 0 &&
        (<>
          <div>{convertToStars(ratingStars)}</div>
          <span>
            Read all <a href="#ratingsScrollFromProduct">{totalRatings}</a> reviews
          </span>
        </>)
      }

      <h2>
        {getProductCategory()}
      </h2>
      <h1>
        {getProductName()}
      </h1>
      ${getProductPrice()}
    </div>
  );
}

export default ProductHeader;
