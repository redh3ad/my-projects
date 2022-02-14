import React, { useState, useEffect } from 'react'
import st from './QuizPage.module.scss'
import axios from 'axios';
import Question from './Question/Question';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [load, setLoad] = useState(true);
  const [check, setCheck] = useState(true);
  const [correct, setCorrect] = useState(0);
  const [restart, setRestart] = useState(true);
  const [btnChange, setBtnChange] = useState(false);
  
  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=5')
      .then(res => {
        const data = res.data.results;
        setQuestions(data);
        setLoad(false);
      })
  }, [restart])

  function checkResult(){
    if(!load){
      setCheck(prevCheck => !prevCheck);
      setBtnChange(prevBtn => !prevBtn);
    }
  }
  
  function restartGame(){
    setBtnChange(prevBtn => !prevBtn);
    setRestart(prevStart => !prevStart);
    setLoad(true);
    setCorrect(0);
  }

  return (
    <div className='app'>
      <div className={st.quiz__page}>
        {load
          ? <div className={st.loader}></div>
          : questions.map((quiz, index) => 
            <Question key={index} question={quiz.question} corAns={quiz.correct_answer} incAns={quiz.incorrect_answers} check={check} setCorrect={setCorrect} btnChange={btnChange}/>
        )
        }
        {btnChange
          ? <div className={st.correct__answer}>
              <h2>You scored {correct}/5 correct answers</h2>
              <button onClick={restartGame} className={st.question__button}>Play Again</button>
            </div>
          : <button onClick={checkResult} className={st.question__button}>Check answers</button>
        }
      </div>
    </div>
    
  )
}

export default QuizPage