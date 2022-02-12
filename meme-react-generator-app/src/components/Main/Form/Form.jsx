import React from 'react'
import Button from './Button/Button'
import st from './Form.module.scss'

const Form = ({inputTop, inputBottom, getMemeImage, handleChange}) => {
  return (
    <form className={st.form__container}>
      <div className={st.form__input__container}>
        <input name='topText' className={st.form__input} value={inputTop} onChange={handleChange} placeholder='Top text'/>
        <input name='bottomText' className={st.form__input} value={inputBottom} onChange={handleChange} placeholder='Bottom text'/>
      </div>
      <Button getMemeImage={getMemeImage}/>
    </form>
  )
}

export default Form;