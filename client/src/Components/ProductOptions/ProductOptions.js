import ProductHeader from "../ProductHeader/ProductHeader";
import ProductStyles from "../ProductStyles/ProductStyles";
import ProductBuy from "../ProductBuy/ProductBuy";
import "./ProductOptions.scss";
import { useEffect, useState } from "react";

function ProductOptions({ product, productStyles, setSelectedStyle, selectedStyle }) {
  const [activeStyleName, setActiveStyleName] = useState(null);
  const [activeProductSkus, setActiveProductSkus] = useState(null);

  // whenever the selected style changes or the products, change the sizes/quantities
  useEffect(() => {
    let skus;
    for (let product of productStyles) {
      if (product.style_id === selectedStyle) {
        skus = product.skus;
      }
    }
    // console.log(`skus: ${JSON.stringify(skus)}`);
    setActiveProductSkus(skus);
  }, [selectedStyle, productStyles]);

  // whenever the selected style changes, change the active name
  useEffect(() => {
    let styleName;
    for (let product of productStyles) {
      if (product.style_id === selectedStyle) {
        styleName = product.name;
      }
    }
    setActiveStyleName(styleName);
  }, [selectedStyle, productStyles]);

  return (
    <div className="ProductOptions">
      <ProductHeader
        product={product}
        selectedStyle={selectedStyle}
        activeStyleName={activeStyleName}
      />
      <ProductStyles
        productStyles={productStyles}
        setSelectedStyle={setSelectedStyle}
        selectedStyle={selectedStyle}
      />
      <ProductBuy productStyles={productStyles} skus={activeProductSkus} />
    </div>
  );
}

export default ProductOptions;
