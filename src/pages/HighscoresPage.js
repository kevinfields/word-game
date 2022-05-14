import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GGHighScoreItem from "../components/GGHighScoreItem";
import NavButton from "../components/NavButton";

const GuessingGameHSList = (props) => {
  const [hsList, setHsList] = useState([]);

  const retrieveScores = async () => {
    let hsCatcher = [];
    await props.firestore
      .collection("wordle-scores")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          hsCatcher.push(doc.data());
        });
      })
      .then(() => {
        hsCatcher.sort((a, b) => a.time - b.time);
        hsCatcher = hsCatcher.slice(0, 10);
        setHsList(hsCatcher);
      });
  };

  useEffect(() => {
    retrieveScores();
  }, []);

  return (
    <div className="page">
      <div className="gg-hs-all-items-list">
        {hsList.length > 0 &&
          hsList.map((item) => (
            <GGHighScoreItem
              item={item}
              rank={hsList.indexOf(item)}
              key={hsList.indexOf(item)}
            />
          ))}
      </div>
      <NavButton
        css={"gg-play-again"}
        route={"/wordle"}
        display={"Click here to play"}
      />
    </div>
  );
};

export default GuessingGameHSList;
