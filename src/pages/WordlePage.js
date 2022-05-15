import React, { useState, useEffect, useRef } from "react";
import { WORDLE } from "../data/WORDLE.js";
import { WORDLE_ACC } from "../data/WORDLE_ACC";
import '../styling/wordlePage.css';
import getCorrectArray from "../functions/getCorrectArray";
import Guess from "../components/Guess";
import EndScreen from "../components/EndScreen";
import GuessScreen from "../components/GuessScreen";
import UploadGGScore from "../components/UploadGGScore";
import NavButton from "../components/NavButton";

const valid = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const GuessingGame = (props) => {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [allowUpload, setAllowUpload] = useState(false);
  const [date, setDate] = useState({});
  const [correct, setCorrect] = useState(
    WORDLE[Math.floor(Math.random() * WORDLE.length)].toUpperCase()
  );
  const [endScreen, setEndScreen] = useState({
    open: false,
    success: false,
    word: "",
    guesses: [],
    time: 0,
    allow: false,
  });
  const inputRef = useRef();
  const [time, setTime] = useState(0);

  const startGameFunctions = () => {
    if (endScreen.open) {
      setEndScreen({
        open: false,
        success: false,
        word: "",
        guesses: [],
        time: 0,
        allow: false,
      });
    }
    setTime(new Date());
    setAllowUpload(false);
  };

  useEffect(() => {
    if (guess.length > 5) {
      setGuess(guess.substring(0, 5));
    }
    let guessArr = guess.split("");
    for (let i=0; i<guessArr.length; i++) {
      if (guessArr[i].toLowerCase() === guessArr[i]) {
        guessArr[i] = guessArr[i].toUpperCase();
      }
    }
    if (guessArr.join('') !== guess) {
      setGuess(guessArr.join(''));
    }
    if (!valid.includes(guessArr[guessArr.length - 1])) {
      setGuess(guess.substring(0, guessArr.length - 1));
    }
  }, [guess]);

  useEffect(() => {
    if (guesses.length === 6) {
      setEndScreen({
        open: true,
        success: false,
        word: correct,
        guesses: guesses,
        time: 0,
        allow: false,
      });
      setGuesses([]);
      setCorrect(
        WORDLE[Math.floor(Math.random() * WORDLE.length)].toUpperCase()
      );
    }
    setGuess("");
  }, [guesses]);

  useEffect(() => {
    if (endScreen.allow) {
      uploadScore();
      if (props.user && props.firestore) {
        setAllowUpload(true);
        setDate(new Date());
      }
    }
  }, [endScreen]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const uploadScore = () => {
    const hsObj = {
      score: endScreen.time,
      word: endScreen.word,
      guesses: endScreen.guesses.length + 1,
    };
  };

  const makeGuess = () => {
    if (guess.length !== 5) {
      return;
    }

    if (guesses.includes(guess)) {
      return;
    }

    let lowercase = guess.split("");
    for (let i = 0; i < 5; i++) {
      lowercase[i] = lowercase[i].toLowerCase();
    }

    if (!WORDLE_ACC.includes(lowercase.join(""))) {
      console.log("does not include " + lowercase.join(""));
      return;
    }
    if (guesses.length === 0) {
      startGameFunctions();
    }
    setGuesses([...guesses, guess]);

    if (guess === correct) {
      setEndScreen({
        open: true,
        success: true,
        word: correct,
        guesses: guesses,
        time: (new Date() - time) / 1000,
        allow: true,
      });
      setGuesses([]);
      setCorrect(
        WORDLE[Math.floor(Math.random() * WORDLE.length)].toUpperCase()
      );
      setAllowUpload(true);
    }
    if (guesses.length === 6) {
      setEndScreen({
        open: true,
        success: false,
        word: correct,
        guesses: guesses,
        time: 0,
        allow: false,
      });
      setGuesses([]);
      setCorrect(
        WORDLE[Math.floor(Math.random() * WORDLE.length)].toUpperCase()
      );
    }
    setGuess("");
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      makeGuess();
    }
  };

  const closeScreen = () => {
    setEndScreen({
      open: false,
      success: false,
      word: "",
      guesses: [],
      time: 0,
    });
    setAllowUpload(false);
  };

  return (
    <div className="page">
      <div className="gg-guess-flexbox">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          maxLength="5"
          ref={inputRef}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button onClick={() => makeGuess()}>Enter</button>
      </div>
      <p>{guess}</p>
      <section className="guesses">
        {guesses.length > 0 &&
          guesses.map((g) => (
            <Guess
              key={g}
              guess={g}
              correct={correct}
              corrArray={getCorrectArray(g, correct)}
            />
          ))}
      </section>
      {endScreen.open ? (
        <EndScreen
          message={!endScreen.success ? "Sorry, " : "Congratulations! "}
          correct={endScreen.word}
          guesses={endScreen.guesses}
          closeScreen={() => closeScreen()}
          time={endScreen.time}
        />
      ) : null}
      {allowUpload ? (
        <>
          <UploadGGScore
            user={props.user}
            firestore={props.firestore}
            results={endScreen}
            date={date}
          />
          <NavButton
            route={"/leaderboards"}
            display={"See Highscores"}
            css={"nav-button-gg-hs"}
          />
        </>
      ) : null}
      {!endScreen.open ? (
        <section className="guessing-screen">
          <GuessScreen word={correct} guesses={guesses} />
        </section>
      ) : null}
    </div>
  );
};

export default GuessingGame;
