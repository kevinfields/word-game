import React from "react";
import { useNavigate } from "react-router-dom";

const UploadGGScore = (props) => {
  const navigate = useNavigate();

  const uploadScore = async () => {
    const hsObject = {
      word: props.results.word,
      time: props.results.time,
      guessList: props.results.guesses,
      guesses: props.results.guesses.length + 1,
      timestamp: props.date,
      userId: props.user.uid,
      userName: props.user.displayName,
    };

    let hsList = [];

    await props.firestore
      .collection("wordle-scores")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          hsList.push(doc.data());
        });
      })
      .then(() => {
        hsList.sort((a, b) => a.time - b.time);
        if (hsList.length >= 10) {
          if (props.results.time < hsList[9].time) {
            props.firestore
              .collection("wordle-scores")
              .add(hsObject)
              .then(() => {
                navigate("/leaderboards");
              });
          } else {
            alert(
              `Sorry, to make the leaderboard you currently need a time of ${hsList[9].time} seconds or faster.`
            );
            return;
          }
        } else {
          props.firestore
            .collection("wordle-scores")
            .add(hsObject)
            .then(() => {
              navigate("/leaderboards");
            });
        }
      });
  };

  return (
    <div className="upload-gg-score">
      Want to upload your score to the leaderboard?
      <div>{props.results.time} seconds</div>
      <div className="gg-guesses-list">
        {props.results.guesses.map((guess) => (
          <div>
            {guess} {"->"}{" "}
          </div>
        ))}
      </div>
      <div className="gg-guesses-result">{props.results.word}</div>
      <div>User: {props.user.displayName}</div>
      <button className="gg-upload-score-button" onClick={() => uploadScore()}>
        Upload
      </button>
    </div>
  );
};

export default UploadGGScore;
