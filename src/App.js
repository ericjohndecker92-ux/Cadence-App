import React, { useState, useEffect } from "react";
import "./App.css";
import { toneFamilies, positivePhrases } from "./puzzles/tones";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [overlayCount, setOverlayCount] = useState(null);
  const [designCodeActive, setDesignCodeActive] = useState(false);
  const [winPhrase, setWinPhrase] = useState("");

  const startGame = () => setGameStarted(true);

  const initPuzzle = () => {
    let allWords = [];
    Object.keys(toneFamilies).forEach(fam => {
      allWords.push(...toneFamilies[fam].slice(0, 4));
    });
    setTiles(shuffle(allWords.slice(0, 16).map(w => ({ word: w }))));
    setSelected([]);
    setSolvedGroups([]);
    setOverlayCount(null);
    setWinPhrase("");
  };

  useEffect(() => {
    if (gameStarted) initPuzzle();
  }, [gameStarted]);

  const toggleWord = (tile) => {
    if (selected.includes(tile)) {
      setSelected(selected.filter(t => t !== tile));
    } else if (selected.length < 4) {
      setSelected([...selected, tile]);
    }
  };

  const getCorrectCount = () => {
    let counts = {};
    Object.keys(toneFamilies).forEach(fam => {
      counts[fam] = selected.filter(s => toneFamilies[fam].includes(s.word)).length;
    });
    return Math.max(...Object.values(counts));
  };

  const checkSelection = () => {
    if (selected.length !== 4) return;
    const correctCount = getCorrectCount();
    setOverlayCount(correctCount);

    if (correctCount === 4) {
      // find matching family
      const matchedFamily = Object.keys(toneFamilies).find(fam =>
        selected.every(s => toneFamilies[fam].includes(s.word))
      );
      setSolvedGroups([...solvedGroups, { words: selected, family: matchedFamily }]);
      setTiles(shuffle(tiles.filter(t => !selected.includes(t))));
      setDesignCodeActive(true);
    }

    setSelected([]);

    // Puzzle finished?
    if (tiles.length - selected.length <= 0) {
      setWinPhrase(shuffle(positivePhrases)[0]);
    }
  };

  const handleDesignCode = (e) => {
    if (e.target.value.toLowerCase() === "cat") {
      initPuzzle();
      setDesignCodeActive(false);
    }
  };

  return !gameStarted ? (
    <div className="container intro-screen">
      <h1>Cadence: Tone Connections</h1>
      <p>Select four words that belong to the same tone family. Feedback is immediate.</p>
      <button onClick={startGame}>Start Game</button>
    </div>
  ) : (
    <div className="container">
      <h1>Cadence: Tone Connections</h1>

      {overlayCount !== null && (
        <div className="overlay">{overlayCount} Correct!</div>
      )}

      <div className="grid">
        {tiles.map(tile => (
          <button
            key={tile.word + Math.random()}
            className={`word ${selected.includes(tile) ? "selected" : ""}`}
            onClick={() => toggleWord(tile)}
          >
            {tile.word}
          </button>
        ))}
      </div>

      <button className="submit" disabled={selected.length !== 4} onClick={checkSelection}>
        Submit
      </button>

      <div className="solved-groups">
        {solvedGroups.map((group, i) => (
          <div key={i} className="solved-box">
            <h3>{group.family}</h3>
            <div className="solved-words">{group.words.map(w => w.word).join(", ")}</div>
          </div>
        ))}
      </div>

      {winPhrase && <div className="win-graphic"><div className="win-phrase">{winPhrase}</div></div>}

      {designCodeActive && (
        <div className="design-code">
          Enter design code: <input type="password" onChange={handleDesignCode} />
        </div>
      )}
    </div>
  );
}