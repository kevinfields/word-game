import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import '../styling/highscoresPage.css';
import GGFirstTryItem from "../components/GGFirstTryItem";
import GGHighScoreItem from "../components/GGHighScoreItem";
import NavButton from "../components/NavButton";

const GuessingGameHSList = (props) => {
  const [hsList, setHsList] = useState([]);
  const [listType, setListType] = useState(props.mode);
  const navigate = useNavigate();

  const retrieveScores = async () => {
    let hsCatcher = [];
    if (listType === 'timed') {
      await props.firestore
        .collection('wordle-scores')
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
    } else if (listType === 'first tries') {
      await props.firestore.collection('first-tries').get().then(snap => {
        snap.forEach((doc) => {
          hsCatcher.push(doc.data());
        })
      })
      .then(() => {
        setHsList(hsCatcher);
      })
    }
  };

  useEffect(() => {
    retrieveScores();
  }, [listType]);

  useEffect(() => {
    let route = '';
    switch (listType) {
      case 'timed':
        route = '/leaderboards/timed';
        break;
      case 'first tries':
        route = '/leaderboards/first-tries';
        break;
      default:
        break;
    }
    if (route !== '' && props.mode !== listType) {
      console.log('rerouting to ' + route)
      navigate(route)
    }
  }, [listType])

  return (
    <div className="page">
      <div className='hs-page-selector'>
        <select onChange={(e) => setListType(e.target.value)} value={listType}>
          <option value='timed'>Timed</option>
          <option value='first tries'>First Try</option>
        </select>
      </div>
      <div className="gg-hs-all-items-list">
        {hsList.length > 0 &&
          hsList.map((item) => (
            item.guesses > 0 ?
            <GGHighScoreItem
              item={item}
              rank={hsList.indexOf(item)}
              key={hsList.indexOf(item)}
            />
            :
            <GGFirstTryItem
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
