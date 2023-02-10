import handleFullScreen from "../../Utils/handleFullScreen";

function AnswerImage({ index, url, username }) {
  const handlePhotoClick = (e) => {
    handleFullScreen(e.target, "answerPhoto");
  };
  return (
    <img
      className="answerPhoto"
      key={index}
      src={url}
      alt={username}
      onClick={handlePhotoClick}
    ></img>
  );
}

export default AnswerImage;
