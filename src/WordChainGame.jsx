import React, { useState } from "react";
import "./WordChainGame.css"; 

const WordChainGame = () => {
  const [words, setWords] = useState([]); //use for list of words
  const [currentWord, setCurrentWord] = useState(""); //use for accept current input
  const [playerTurn, setPlayerTurn] = useState(1); //use for track the player turns
  const [gameOver, setGameOver] = useState(false); //use for track game is over or not
  const [error, setError] = useState(""); //use for validation

  const handleWordSubmit = () => {
    //checks entered character is digit or special symbol
    if (!/^[a-zA-Z]+$/.test(currentWord)) {
      setError("Special symbols and digits are not allowed!");
      return;
    }
  
    //checks given word (input word) is already used or not
    if (words.includes(currentWord)) {
      setError(`Word already used! Player ${playerTurn} loses.`);
      setGameOver(true);
      return;
    }
  
    //checks the given word is starting with previous word last character or not
    if (words.length > 0) {
      const lastWord = words[words.length - 1];
      if (currentWord[0].toLowerCase() !== lastWord[lastWord.length - 1].toLowerCase()) {
        setError(
          `Word does not start with '${lastWord[lastWord.length - 1]}'. Player ${playerTurn} loses.`
        );
        setGameOver(true);
        return;
      }
    }
  
    setWords([...words, currentWord]);
    setCurrentWord("");
    setError(""); 
    setPlayerTurn(playerTurn === 1 ? 2 : 1); 
  };

  return (
    <div className="main-container">
      <div className="game-container">
        <h1 className="game-title">Word Chain Game</h1>
        <div className="chain-container">
          <strong>Chain of Words:</strong>
          <p className="word-chain">
            {words.length > 0 ? words.join(" → ") : "No words yet"}
          </p>
        </div>
  
        {gameOver ? (
          <div className="game-over">
            <h2>Game Over!</h2>
            <p className="error-message">{error}</p>
            <button className="restart-btn" onClick={() => window.location.reload()}>
              Restart Game
            </button>
          </div>
        ) : (
          <div className="input-container">
            <p className="turn-indicator">Player {playerTurn}'s turn</p>
            <input
              type="text"
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value)}
              placeholder="Enter a word"
              className="word-input"
            />
            <button className="submit-btn" onClick={handleWordSubmit}>
              Submit
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </div>
  
      <footer className="footer">
        Developed by <strong>Study Trigger</strong>
      </footer>
    </div>
  );
};

export default WordChainGame;
