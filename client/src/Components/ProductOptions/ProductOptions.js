import ProductHeader from '../ProductHeader/ProductHeader';
import ProductStyles from '../ProductStyles/ProductStyles';
import ProductBuy
  from '../ProductBuy/ProductBuy';
import './ProductOptions.css';
function ProductOptions({product, productStyles, setSelectedStyle}) {
  return (
    <div className="ProductOptions">
      <ProductHeader product={product} />
      <ProductStyles productStyles={productStyles} setSelectedStyle={setSelectedStyle} />
      <ProductBuy />
    </div>
  );
}

export default ProductOptions;