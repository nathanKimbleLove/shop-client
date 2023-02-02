import "./ProductHeader.css";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductHeader({ product }) {
  const [totalRatings, setTotalRatings] = useState(null);

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
      {totalRatings > 0 && (
        <>
          <span>total ratings:</span>
          <a href="#testscroll">{totalRatings}</a>
        </>
      )}
      <h2>{getProductCategory()}</h2>
      <h3>{getProductName()}</h3>${getProductPrice()}
    </div>
  );
}

export default ProductHeader;
