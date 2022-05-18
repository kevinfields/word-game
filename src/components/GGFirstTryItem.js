import React from 'react';
import formatTime from '../functions/formatTime';

const GGFirstTryItem = (props) => {
  return (
    <div className="gg-hs-single-item">
      <h3>#{props.rank + 1}</h3>
      <div>First Try</div>
      <div className="gg-guesses-result">{props.item.word}</div>
      <div>User: {props.item.userName}</div>
      <div>Date: {formatTime(props.item.timestamp.seconds * 1000)}</div>
    </div>
  )
}

export default GGFirstTryItem