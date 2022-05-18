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
import BadgeAlert from "../components/BadgeAlert.js";
import ADD_BADGE from "../reducers/ADD_BADGE.js";
import ADD_COMPLETED from "../reducers/ADD_COMPLETED.js";
import ADD_BADGES from "../reducers/ADD_BADGES.js";
import UploadGGFTScore from "../components/UploadGGFTScore.js";

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
  const [allowFTUpload, setAllowFTUpload] = useState(false);
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
  const [badgeAlert, setBadgeAlert] = useState({
    open: false,
    text: '',
  })

  const [time, setTime] = useState(0);
  const userRef = props.firestore.collection('users').doc(props.user.uid);
  const inputRef = useRef();

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
    setBadgeAlert({
      open: false,
      text: '',
    })
  };

  const checkHighscore = async (time) => {
    const scoreCatcher = [];

    await props.firestore.collection('wordle-scores').get().then(snap => {
      snap.forEach(doc => {
        scoreCatcher.push({
          data: doc.data(),
          id: doc.id,
        });
      })
      scoreCatcher.sort((a, b) => a.data.time - b.data.time);
      if (time < scoreCatcher[9].data.time && time !== 0) {
        setAllowUpload(true);
        setDate(new Date());
        addHighscoreBadge();
      } else if (time === 0) {
        setAllowUpload(false);
        setAllowFTUpload(true);
        setDate(new Date());
      } else {
        setAllowUpload(false);
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const markCompleted = async () => {

    let completed = ADD_COMPLETED(userRef);
    console.log(completed)
    switch (completed) {
      case 1:
        setBadgeAlert({
          open: true,
          text: 'Novice Player',
        })
        await ADD_BADGE( userRef, 'Novice Player');
        break;
      case 100: 
        setBadgeAlert({
          open: true,
          text: 'Intermediate Player',
        })
        await ADD_BADGE(userRef, 'Intermediate Player');
        break;
      case 500:
        setBadgeAlert({
          open: true,
          text: 'Expert Player'
        })
        await ADD_BADGE(userRef, 'Expert Player');
        break;
      default:
        break;
    }
  }

  const addHighscoreBadge = async () => {
    await ADD_BADGE(userRef, 'Highscore');;
    setBadgeAlert({
      open: true,
      text: 'Highscore',
    })
  }

  useEffect(() => {
    if (guess.length > 5) {
      setGuess(guess.substring(0, 5));
    }
    let guessArr = guess.split("");
    for (let i=0; i<guessArr.length; i++) {
      if (guessArr[i].toLowerCase() === guessArr[i]) {
        guessArr[i] = guessArr[i].toUpperCase();
      }
      if (!valid.includes(guessArr[i])) {
        if (i < guessArr.length - 1) {
          guessArr.splice(i, 1)
        } else {
          guessArr.pop();
        }
      }
    }
    if (guessArr.join('') !== guess) {
      setGuess(guessArr.join(''));
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
    console.log('.guesses: ' + endScreen.guesses)
    if (endScreen.allow && props.user && props.firestore) {
        checkHighscore(endScreen.time);
        markCompleted();
      if (endScreen.word.split('').includes('Q')) {
        ADD_BADGE('Word with Q', userRef).then(() => {
          setBadgeAlert({
            open: true,
            text: 'Word with Q', 
          })
        })
      }
      if (endScreen.word.split('').includes('Z')) {
        ADD_BADGE('Word with Z', userRef).then(() => {
          setBadgeAlert({
            open: true,
            text: 'Word with Z',
          })
        })
      }
      if (endScreen.word.split('').includes('X')) {
        ADD_BADGE(userRef, 'Word with X').then(() => {
          setBadgeAlert({
            open: true,
            text: 'Word with X',
          })
        })
      }
      if (endScreen.guesses.length === 0) {
        ADD_BADGES(userRef, 'First Try', 'Two or Less', 'Three or Less').then(() => {
          setBadgeAlert({
            open: true,
            text: 'First Try, Two or Less, and Three or Less',
          })
        });
      } else if (endScreen.guesses.length <= 1 && endScreen.guesses.length > 0) {
        ADD_BADGES(userRef, 'Two or Less', 'Three or Less').then(() => {
          setBadgeAlert({
            open: true,
            text: 'Two or Less and Three or Less',
          })
        });
      } else if (endScreen.guesses.length <= 2 && endScreen.guesses.length > 0) {
        ADD_BADGE(userRef, 'Three or Less').then(() => {
          setBadgeAlert({
            open: true,
            text: 'Three or Less',
          })
        })
      }
    }
  }, [endScreen]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);


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
        time: guesses.length > 0 ? ((new Date() - time) / 1000) : 0,
        allow: true,
      });
      setGuesses([]);
      setCorrect(
        WORDLE[Math.floor(Math.random() * WORDLE.length)].toUpperCase()
      );
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

  useEffect(() => {
    console.log('correct: ' + correct);
  }, [correct])

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
        </>
      ) : allowFTUpload ? 
        <>
          <UploadGGFTScore
            user={props.user}
            firestore={props.firestore}
            results={endScreen}
            date={date}
          />
        </>
        : null}
      {!endScreen.open ? (
        <section className="guessing-screen">
          <GuessScreen word={correct} guesses={guesses} />
        </section>
      ) :
      <>
      <NavButton
        route={"/leaderboards/timed"}
        display={"See Highscores"}
        css={"nav-button-gg-hs"}
      />
      <div className='play-again-alert'>
        Type a new guess to play again.
      </div>
      </> }
      {badgeAlert.open ? 
      <BadgeAlert text={badgeAlert.text} onClose={() => setBadgeAlert({
        open: false,
        text: '',
      })}/>
      : null}
    </div>
  );
};

export default GuessingGame;
