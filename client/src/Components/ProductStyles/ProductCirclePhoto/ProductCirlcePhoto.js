import './ProductCirclePhoto.scss';

function ProductCirclePhoto({ photo, id, setSelectedStyle }) {

  function handleImageclick() {
    setSelectedStyle(id);
  }

  return (
    <div className="productCircleContainer">
      <img className="productCirclePhoto" src={photo} alt="product photos" onClick={handleImageclick} />
    </div>
  );
}

export default ProductCirclePhoto;