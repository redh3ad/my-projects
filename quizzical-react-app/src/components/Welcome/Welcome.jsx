import React from 'react'
import st from './Welcome.module.scss'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className='app welcome'>
      <div className={st.welcome__page}>
        <h1 className={st.welcome__title}>Quizzical</h1>
        <p className={st.welcome__description}>This application was created by Egor Matyas for educational purposes.</p>
        <p className={`${st.welcome__description} ${st.p_last}`}>Good luck!</p>
        <Link to='/quizzical'>
          <button className={st.welcome__btn}>Start quiz</button>
        </Link>
      </div>
    </div>
  )
}

export default Welcome