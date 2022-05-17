import React from 'react'

const BadgeAlert = (props) => {
  return (
    <div className='new-badge-alert'>
      Congratulations! You just earned the {props.text} badge!
      <button onClick={() => props.onClose()}>X</button>
    </div>
  )
}

export default BadgeAlert