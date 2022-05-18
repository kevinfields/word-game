import React from "react";

const EndScreen = (props) => {
  return (
    <div className="end-screen">
      <p>{props.message}</p>
      <div className="gg-end-screen-guesses-list">
        {props.guesses.reverse().map((g) => (
          <p key={props.guesses.indexOf(g)} className="gg-single-guess">
            {g} {"->"}
          </p>
        ))}
        <p className="gg-correct-guess">{props.correct}</p>
      </div>
      <div className="gg-end-screen-extras">
        {/* <button
          onClick={() => props.closeScreen()}
          className="close-gg-end-screen"
        >
          X
        </button> */}
        <p className="gg-end-screen-time">{props.time} seconds</p>
      </div>
    </div>
  );
};

export default EndScreen;
