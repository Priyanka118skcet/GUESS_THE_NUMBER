import React, { useState, useEffect } from "react";
import '../GuessTheNumber/Guess.css';

const MAX_ATTEMPTS = 10;

function GuessTheNumber() {
  const [numberToGuess, setNumberToGuess] = useState(null);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [guessHistory, setGuessHistory] = useState([]);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [hintsUsed, setHintsUsed] = useState(0);

  useEffect(() => {
    if (!numberToGuess) {
      generateNumberToGuess();
    }
  }, [numberToGuess]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameOver]);

  const generateNumberToGuess = () => {
    let minRange, maxRange;

    switch (difficulty) {
      case "easy":
        minRange = 1;
        maxRange = 50;
        break;
      case "medium":
        minRange = 1;
        maxRange = 100;
        break;
      case "hard":
        minRange = 1;
        maxRange = 200;
        break;
      default:
        minRange = 1;
        maxRange = 100;
    }

    setNumberToGuess(Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange);
  };

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = () => {
    const userGuess = parseInt(guess);

    if (!isNaN(userGuess)) {
      setAttempts(attempts + 1);

      if (userGuess === numberToGuess) {
        setFeedback(`Congratulations! You've guessed the number ${numberToGuess} in ${attempts} attempts. It took you ${timer} seconds.`);
        setGameOver(true);
      } else if (userGuess < numberToGuess) {
        setFeedback("Too low! Try again.");
      } else {
        setFeedback("Too high! Try again.");
      }

      if (attempts === MAX_ATTEMPTS) {
        setFeedback(`Sorry, you've reached the maximum number of attempts. The correct number was ${numberToGuess}.`);
        setGameOver(true);
      }

      setGuessHistory([...guessHistory, { guess: userGuess, feedback }]);
    } else {
      setFeedback("Please enter a valid number.");
    }
  };

  const handleReset = () => {
    setNumberToGuess(null);
    setGuess("");
    setFeedback("");
    setAttempts(0);
    setGuessHistory([]);
    setTimer(0);
    setGameOver(false);
    setHintsUsed(0);
    generateNumberToGuess();
  };

  const handleHint = () => {
    let hint;

    if (numberToGuess % 2 === 0) {
      hint = "The number is even.";
    } else {
      hint = "The number is odd.";
    }

    setFeedback(hint);
    setHintsUsed(hintsUsed + 1);
  };

  return (
    <div className="container">
      <h1 className="ll"><strong>Guess the Number</strong></h1>
      <p>{feedback}</p>
      <input type="text" className="rr" value={guess} onChange={handleGuessChange} disabled={gameOver} />
      <button onClick={handleGuessSubmit} disabled={gameOver}>Submit Guess</button>
      <button onClick={handleHint} disabled={hintsUsed >= 3 || gameOver}>Hint</button>
      <button onClick={handleReset}>Reset Game</button>
      <div>
        <h2>Guess History</h2>
        <ul>
    
        </ul>
      </div>
      <div className="options-container">
        <div className="KK">
          <p>Attempts: {attempts}</p>
          <p>Time: {timer} seconds</p>
          <p>Hints used: {hintsUsed}/3</p>
        </div>
        <div className="KK"> 
          <label htmlFor="difficulty">Difficulty:</label>
          <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default GuessTheNumber;
