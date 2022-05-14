import React, { useState } from "react";

const GuessScreen = (props) => {
  function vowels(arr) {
    return arr.filter((letter) =>
      ["A", "E", "I", "O", "U", "Y"].includes(letter)
    );
  }

  function consonants(arr) {
    return arr.filter(
      (letter) => !["A", "E", "I", "O", "U", "Y"].includes(letter)
    );
  }

  let used = [];
  let directHits = ["-", "-", "-", "-", "-"];

  for (let i = 0; i < props.guesses.length; i++) {
    let gArr = props.guesses[i].split("");
    for (let j = 0; j < 5; j++) {
      if (!used.includes(gArr[j])) {
        used.push(gArr[j]);
      }
      if (props.word.split("")[j] === gArr[j]) {
        directHits[j] = gArr[j];
      }
    }
  }

  let hits = used.filter((item) => props.word.includes(item));
  let fails = used.filter((item) => !hits.includes(item));
  let untested = [
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
  ].filter((letter) => !used.includes(letter));
  return (
    <div className="gg-guess-screen">
      <p>
        Hits: {vowels(hits)}, {consonants(hits)}
      </p>
      <p>
        Fails: {vowels(fails)}, {consonants(fails)}
      </p>
      <p>
        Untested: {vowels(untested)}, {consonants(untested)}
      </p>
      <p>Structure: {directHits}</p>
    </div>
  );
};

export default GuessScreen;
