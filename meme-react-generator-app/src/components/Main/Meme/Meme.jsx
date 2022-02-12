import React from 'react'
import st from './Meme.module.scss'

const Meme = ({inputTop, inputBottom, url}) => {
  return (
    <div className={st.meme__container}>
      <img className={st.meme__img} src={url} alt='meme'/>
      <span className={st.meme__top}>{inputTop}</span>
      <span className={st.meme__bottom}>{inputBottom}</span>
    </div>
  )
}

export default Meme;