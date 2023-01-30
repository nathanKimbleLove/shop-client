import ProductHeader from '../ProductHeader/ProductHeader';
import ProductStyles from '../ProductStyles/ProductStyles';
import ProductBuy
  from '../ProductBuy/ProductBuy';
import './ProductOptions.css';
function ProductOptions() {
  return (
    <div className="ProductOptions">
      <ProductHeader />
      <ProductStyles />
      <ProductBuy />
    </div>
  );
}

export default ProductOptions;