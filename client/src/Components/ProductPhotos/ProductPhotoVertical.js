import './ProductPhotoVertical.scss'

function ProductPhotoVertical({ urls, setSelectedPhoto }) {

  const createImages = () => {
    const images = [];
    for (let url of urls) {
      images.push(<img className="miniImage" src={url} alt="" onClick={() => {
        setSelectedPhoto(url);
        console.log(url)
      }} />);
    }
    return images;
  };

  return (
    <div className="productPhotoVertical">
      {createImages()}
    </div>
  );
}

export default ProductPhotoVertical;