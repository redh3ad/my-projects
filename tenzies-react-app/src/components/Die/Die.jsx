import React from 'react'

const Die = ({id, value, isHeld, holdDice}) => {
  return (
    <div onClick={holdDice} className={`die ${isHeld ? 'active' : ''}`}>
      <h2>{value}</h2>
    </div>
  )
}

export default Die