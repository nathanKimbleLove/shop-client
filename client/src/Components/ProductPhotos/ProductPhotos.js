import './ProductPhotos.scss';
import ProductPhotoVertical from './ProductPhotoVertical';
import { useState, useEffect } from 'react';
function ProductPhotos({ productPhotos }) {

  const [selectedPhoto, setSelectedPhoto] = useState(productPhotos[0]);

  useEffect(() => {
    setSelectedPhoto(productPhotos[0]);
  }, [productPhotos])

  return (
    <div className="productPhotos">
      <ProductPhotoVertical urls={productPhotos} setSelectedPhoto={setSelectedPhoto} />
      <img className="productPicture" src={selectedPhoto} alt="shoes" />
    </div>
  );

}

export default ProductPhotos;