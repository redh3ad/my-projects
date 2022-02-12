import React from 'react'
import st from './Header.module.scss'

const Header = () => {
  return (
    <div className={st.header__container}>
      <img src='images/app-logo.png' alt='meme logo'></img>
      <h1>Meme Generator</h1>
    </div>
  )
}

export default Header