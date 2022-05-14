import React from "react";

const Guess = (props) => {
  return (
    <div className="wordle-guess">
      <section className={props.corrArray[0]}>{props.guess[0]}</section>
      <section className={props.corrArray[1]}>{props.guess[1]}</section>
      <section className={props.corrArray[2]}>{props.guess[2]}</section>
      <section className={props.corrArray[3]}>{props.guess[3]}</section>
      <section className={props.corrArray[4]}>{props.guess[4]}</section>
    </div>
  );
};

export default Guess;
