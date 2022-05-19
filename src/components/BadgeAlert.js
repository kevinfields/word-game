import React from 'react'

const BadgeAlert = (props) => {

  const badge = props.plural ? 'badges' : 'badge';

  const displayItem = (item) => {
    if (props.plural && props.badges.indexOf(item) === props.badges.length - 1) {
      return 'and ' + item;
    } else if (props.plural) {
      return item + ', ';
    } else {
      return item;
    }
  }

  return (
    <div className='new-badge-alert'>
      <h3>Congratulations!</h3>
      <p className='badge-alert-text'>You just earned the {props.badges.map(item => (
        displayItem(item)
      ))} {badge}!</p>
      <button onClick={() => props.onClose()} className='close-badge-alert'>X</button>
    </div>
  )
}

export default BadgeAlert