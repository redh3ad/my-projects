import React from 'react'
import st from './Main.module.scss'
import Form from './Form/Form'
import Meme from './Meme/Meme'
import { useState, useEffect} from 'react'

const Main = () => {

  const [allMeme, setAllMeme] = useState({})
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImg: 'https://i.imgflip.com/1bij.jpg',
  })

  // useEffect(() => {
  //   fetch('https://api.imgflip.com/get_memes')
  //     .then(res => res.json())
  //     .then(data => setAllMeme(data.data.memes))
  // }, [])

  useEffect(() => {
    async function getMemes(){
      const res = await fetch('https://api.imgflip.com/get_memes');
      const data = await res.json();
      setAllMeme(data.data.memes)
    }
    getMemes()
  }, [])
  

  function handleChange(e){
    const {name, value} = e.target;
    setMeme(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  function getMemeImage(e) {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randomNumber].url;
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImg: url,
    }))
  }

  return (
    <div className={st.main__container}>
      <Form inputTop={meme.topText} inputBottom={meme.bottomText} getMemeImage={getMemeImage} handleChange={handleChange}/>
      <Meme inputTop={meme.topText} inputBottom={meme.bottomText} url={meme.randomImg}/>
    </div>
  )
}

export default Main;