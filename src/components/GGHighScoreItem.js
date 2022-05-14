import React from "react";
import formatTime from "../functions/formatTime";

const GGHighScoreItem = (props) => {
  return (
    <div className="gg-hs-single-item">
      <h3>#{props.rank + 1}</h3>
      <div>{props.item.time} seconds</div>
      <div className="gg-guesses-list">
        {props.item.guessList.map((guess) => (
          <div key={guess}>
            {guess} {"->"}{" "}
          </div>
        ))}
      </div>
      <div className="gg-guesses-result">{props.item.word}</div>
      <div>User: {props.item.userName}</div>
      <div>Date: {formatTime(props.item.timestamp.seconds * 1000)}</div>
    </div>
  );
};

export default GGHighScoreItem;
