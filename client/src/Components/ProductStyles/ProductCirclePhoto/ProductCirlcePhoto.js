import "./ProductCirclePhoto.scss";
import cx from "../../../Utils/cx";

function ProductCirclePhoto({ photo, id, setSelectedStyle, selectedStyle }) {
  function handleImageclick() {
    setSelectedStyle(id);
    // console.log(id)
  }

  return (
    <div className="productCircleContainer">
      <img
        className={cx("productCirclePhoto", selectedStyle === id && "selectedStyle")}
        src={photo}
        alt="product photos"
        onClick={handleImageclick}
      />
    </div>
  );
}

export default ProductCirclePhoto;
