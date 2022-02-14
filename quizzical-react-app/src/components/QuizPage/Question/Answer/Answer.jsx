import React from 'react'
import st from './Answer.module.scss'

const Answer = ({answer, chooseAnswer, isChoose, trueValue, notTrueValue, falseValue}) => {
  return (
    <button 
      onClick={chooseAnswer}
      className={`${st.answer} ${isChoose ? st.active : ''} ${trueValue ? st.true : ''} ${notTrueValue ? st.notTrue : ''} ${falseValue ? st.false : ''}`}>
        {answer}
    </button>
  )
}

export default Answer