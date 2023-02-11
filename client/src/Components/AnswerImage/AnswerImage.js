import handleFullScreen from "../../Utils/handleFullScreen";

function AnswerImage({ index, url }) {
  const handlePhotoClick = (e) => {
    handleFullScreen(e.target, "answerPhoto");
  };
  if (url) {
    return <img className="answerPhoto" src={url} alt="" onClick={handlePhotoClick}></img>;
  } else {
    return null;
  }
}

export default AnswerImage;
