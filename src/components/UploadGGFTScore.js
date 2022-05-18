import React from "react";
import { useNavigate } from "react-router-dom";

const UploadGGFTScore = (props) => {
  const navigate = useNavigate();

  const uploadScore = async () => {
    const hsObject = {
      word: props.results.word,
      guesses: -1,
      timestamp: props.date,
      userId: props.user.uid,
      userName: props.user.displayName,
    };
    await props.firestore.collection("first-tries").add(hsObject).then(() => {
      navigate("/leaderboards/first-try");
    });
  };

  return (
    <div className="upload-gg-score">
      Want to upload your score to the leaderboard?
      <div>First Try</div>
      <div className="gg-guesses-result">{props.results.word}</div>
      <div>User: {props.user.displayName}</div>
      <button className="gg-upload-score-button" onClick={() => uploadScore()}>
        Upload
      </button>
    </div>
  );
};

export default UploadGGFTScore