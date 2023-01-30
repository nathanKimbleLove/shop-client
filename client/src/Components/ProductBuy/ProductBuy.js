import './ProductBuy.css';

function ProductBuy() {
  return (
    <div className="productBuy">

      <select className="sizeSelector" name="" id="">
        <option value="">Select Size</option>
        <option value="extra-small">XS</option>
        <option value="small">S</option>
        <option value="medium">M</option>
        <option value="large">L</option>
        <option value="extra-large">XL</option>
      </select>

      <select className="quantity" name="" id="">
        <option value="">Select Quantity</option>
        <option value="extra-small">1</option>
        <option value="small">2</option>
        <option value="medium">3</option>
      </select>

      <button>Add to Bag</button>

      <button>star</button>


    </div>

  );
}

export default ProductBuy;