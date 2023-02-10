function AnswerImage({ index, url, username, handlePhotoClick }) {
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
