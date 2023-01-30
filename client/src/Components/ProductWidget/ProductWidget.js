import './ProductWidget.css';
import ProductDecription from '../ProductDescription/ProductDescription.js';
import ProductOptions from '../ProductOptions/ProductOptions.js';
import ProductPerks from '../ProductPerks/ProductPerks.js';
import ProductPhotos from '../ProductPhotos/ProductPhotos.js';


function ProductDetails() {
  return (
    <div className="productWidget">
      <ProductPhotos />
      <ProductOptions />
      <ProductDecription />
      <ProductPerks />
    </div>
  );
}

export default ProductDetails;