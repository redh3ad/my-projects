import { useState, useEffect } from 'react';
import './App.scss';
import Die from './components/Die/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import { useStopwatch } from 'react-timer-hook';

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      pause();
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      reset();
      start();
      setRolls(0);
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        }),
      );
      setRolls((prevRolls) => prevRolls + 1);
      if (!isRunning) {
        start();
      }
    }
  }

  function holdDice(diceId) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === diceId ? { ...die, isHeld: !die.isHeld } : die;
      }),
    );
  }

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <p> Click "Roll" to start the game time</p>
      <div className="die__container">
        {dice.map((die) => (
          <Die
            key={die.id}
            id={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </div>
      <button className="btn__roll" onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
      <div className="time">
        <h3>
          Time: {minutes} : {seconds}
        </h3>
        <h3>Rolls: {rolls}</h3>
      </div>
    </div>
  );
}

export default App;
