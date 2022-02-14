import React, {useState, useEffect} from 'react'
import st from './Question.module.scss'
import Answer from './Answer/Answer'

const Question = ({question, corAns, incAns, check, setCorrect, btnChange}) => {
  const text = question;
  const correctAnswer = corAns.replace(/&eacute;/g,'é').replace(/&quot;/g,'"').replace(/&rsquo;/g,"'").replace(/&#039;/g,"'").replace(/&amp;/g,"&");

  const [allAnswers, setAllAnswers] = useState([]);

  useEffect(() => {
    setAllAnswers(allAnswers.map(ans => {
      if(!ans.isTrue) {
        ans.notTrueValue = true;
      } else {
        ans.trueValue = true;
      }
      if(ans.isChoose && !ans.isTrue){
        ans.falseValue = true;
      }
      if(ans.isChoose && ans.isTrue){
        setCorrect(prevValue => prevValue + 1);
      }
      return ans;
    }))
  }, [check])

  useEffect(() => {
    setAllAnswers(answersAll.map(answer => {
      return createAnswer(answer);
    }))
  }, [])

  function chooseAnswer(answer){
    if(!btnChange){
      setAllAnswers(allAnswers.map(ans => {
        if(ans.answer === answer){
          return {
            ...ans,
            isChoose: true,
          }
        } else {
          return {
            ...ans,
            isChoose: false,
          }
        }
      }))
    }
  }

  const answersAll = incAns.concat(corAns).map(a => a.replace(/&eacute;/g,'é').replace(/&quot;/g,'"').replace(/&rsquo;/g,"'").replace(/&#039;/g,"'").replace(/&amp;/g,"&")).sort(() => Math.random() - 0.5);

  function createAnswer(answer){
    if(answer === correctAnswer){
      return ({
        answer: answer,
        isChoose: false,
        isTrue: true,
        notTrueValue: false,
        trueValue: false,
        falseValue: false,
      })
    } else {
      return ({
        answer: answer,
        isChoose: false,
        isTrue: false,
        notTrueValue: false,
        trueValue: false,
        falseValue: false,
      })
    }
  }

  return (
    <div className={st.question}>
      <h3 className={st.question__title}>{text.replace(/&eacute;/g,'é').replace(/&quot;/g,'"').replace(/&rsquo;/g,"'").replace(/&#039;/g,"'").replace(/&amp;/g,"&")}</h3>
      <div className={st.question__answers}>
        {allAnswers.map((answer) =>
          <Answer key={answer.answer}
            answer={answer.answer}
            chooseAnswer={() => chooseAnswer(answer.answer)}
            isChoose={answer.isChoose}
            trueValue={answer.trueValue}
            notTrueValue={answer.notTrueValue}
            falseValue={answer.falseValue}
          />
        )}
      </div>
    </div>
  )
}
export default Question
