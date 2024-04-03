import { useEffect, useState } from 'react';
import Toggle from './Toggle.jsx';
import './App.css';

function App() {
  const [userChoice, setUserChoice] = useState(null); // 'rock', 'paper', 'scissors'
  const [botChoice, setBotChoice] = useState(null); // 'rock', 'paper', 'scissors'
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [result, setResult] = useState(null); // 'draw', (user) 'win', (user) 'lose'
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem('mode');
    return storedMode ? storedMode : 'light';
  });

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  }

  // set class on body element to style
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(mode);
  }, [mode]);

  const choices = ['rock', 'paper', 'scissors'];
  const emojiMap = {
    rock: '👊🏼',
    paper: '🖐🏼',
    scissors: '✌🏼'
  };

  // set new bot choice when user choice chanages
  useEffect(() => {
    if (userChoice) {
      const newBotChoice = generateBotChoice();
      setBotChoice(newBotChoice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userChoice]);

  // call calculate result when bot choice changes
  useEffect(() => {
    if (botChoice) {
      calculateResult(userChoice, botChoice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botChoice]);

  const generateBotChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  const calculateResult = (userChoice, botChoice) => {
    if (userChoice == botChoice) {
      setResult('draw');
    } else if ((userChoice == 'rock' && botChoice == 'scissors') || 
      (userChoice == 'scissors' && botChoice == 'paper') || 
      (userChoice == 'paper' && botChoice == 'rock')
    ) {
      setResult('win');
      setUserScore(userScore + 1);
    } else {
      setResult('lose');
      setBotScore(botScore + 1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault(); // prevent the default behavior of the Enter key: no double call of resetGame
      resetGame();
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setBotChoice(null);
    setResult(null);
  }

  const newGame = () => {
    resetGame();
    setBotScore(0);
    setUserScore(0);
  }
 
  return (
    <>
      <Toggle mode={mode} onClick={toggleMode}/>
      <div>
        {(!userChoice && !botChoice) ? (
          <div>
            <img src="../public/bot-emoji.png" alt="robot emoji" />
            <h2>select your choice!</h2>
            <button className='emoji-button' role='button' onClick={() => setUserChoice('rock')}>👊🏼</button>
            <button className='emoji-button' role='button' onClick={() => setUserChoice('paper')}>🖐🏼</button>
            <button className='emoji-button' role='button' onClick={() => setUserChoice('scissors')}>✌🏼</button>
          </div>
        ) : (
          <div className={`result-page ${result}`}>
            <h1>{result}</h1>
            <h3>user: {emojiMap[userChoice]}, bot: {emojiMap[botChoice]}</h3>
            <h1 id='score'>{userScore} : {botScore}</h1>
            <div>
              <button 
                id='play-again-button' 
                tabIndex="1"
                role='button'
                onClick={resetGame}
                onKeyDown={handleKeyDown}
              >play again?</button>
            </div>
            <div>
              <a id='new-game-link' role='link' onClick={newGame}>start a new game</a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
