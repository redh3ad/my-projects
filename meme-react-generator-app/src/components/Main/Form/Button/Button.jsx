import React from 'react'
import st from './Button.module.scss'

const Button = ({getMemeImage}) => {
  return (
    <button className={st.button} onClick={getMemeImage}>Get a new meme image  🖼</button>
  )
}

export default Button