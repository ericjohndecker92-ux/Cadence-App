import React, { useState, useEffect } from "react";
import "./App.css";

/* ===============================
   WEEK 1 DATASET
=============================== */

const week1 = [
  {
    day: "Saturday",
    level: "Starter",
    groups: {
      Positive: ["hopeful", "cheerful", "optimistic", "uplifting"],
      Negative: ["sad", "gloomy", "tense", "anxious"],
      Calm: ["serene", "tranquil", "composed", "measured"],
      Playful: ["playful", "whimsical", "lighthearted", "amusing"]
    }
  }
];

/* ===============================
   WIN PHRASES
=============================== */

const winPhrases = [
  "Brilliant work!",
  "Tone master!",
  "Exceptional analysis!",
  "Rhetorical precision!",
  "Outstanding connections!"
];

/* ===============================
   SHUFFLE
=============================== */

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

/* ===============================
   APP
=============================== */

export default function App() {

  const [dayIndex, setDayIndex] = useState(0);
  const puzzle = week1[dayIndex];

  const [tiles, setTiles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [overlay, setOverlay] = useState(null);
  const [pulseWords, setPulseWords] = useState([]);
  const [winPhrase, setWinPhrase] = useState(null);
  const [showWin, setShowWin] = useState(false);

  /* ===============================
     INITIAL SHUFFLE (RUNS ONCE)
  =============================== */

  useEffect(() => {
    const words = Object.values(puzzle.groups).flat();
    setTiles(shuffle(words));
  }, [dayIndex]);

  /* ===============================
     SELECT
  =============================== */

  const toggleSelect = (word) => {
    if (selected.includes(word)) {
      setSelected(selected.filter(w => w !== word));
    } else if (selected.length < 4) {
      setSelected([...selected, word]);
    }
  };

  /* ===============================
     CHECK
  =============================== */

  const checkSelection = () => {

    if (selected.length !== 4) return;

    let correctCount = 0;
    let matchedFamily = null;

    Object.entries(puzzle.groups).forEach(([family, words]) => {
      const count = selected.filter(w => words.includes(w)).length;
      if (count > correctCount) correctCount = count;
      if (count === 4) matchedFamily = family;
    });

    setOverlay(correctCount);

    if (matchedFamily) {

      setPulseWords(selected);

      setTimeout(() => {

        const updated = [
          ...solvedGroups,
          { family: matchedFamily, words: selected }
        ];

        setSolvedGroups(updated);
        setTiles(tiles.filter(t => !selected.includes(t)));
        setPulseWords([]);

        /* WIN CHECK */

        if (updated.length === 4) {
          const phrase =
            winPhrases[Math.floor(Math.random() * winPhrases.length)];

          setWinPhrase(phrase);
          setShowWin(true);
        }

      }, 1500);
    }

    setSelected([]);
    setTimeout(() => setOverlay(null), 1500);
  };

  /* ===============================
     DESIGN MODE
  =============================== */

  const handleDesignCode = (e) => {

    if (e.target.value.toLowerCase() === "cat") {

      const next = dayIndex + 1;

      if (next < week1.length) {
        setDayIndex(next);
        setSolvedGroups([]);
        setWinPhrase(null);
        setShowWin(false);
      }
    }
  };

  /* ===============================
     CLOSE WIN SCREEN
  =============================== */

  const closeWin = () => {
    setShowWin(false);
  };

  /* ===============================
     RENDER
  =============================== */

  return (
    <div className="app">

      <h1 className="title">Cadence</h1>

      <div className="subtitle">
        Week 1 • {puzzle.day} • Starter
      </div>

      {/* WIN SCREEN */}

      {showWin && (
        <div className="win-screen" onClick={closeWin}>
          <div className="win-box">
            {winPhrase}
            <div className="win-sub">
              (Click anywhere to continue)
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY */}

      {overlay !== null && (
        <div className="overlay">
          {overlay} Correct
        </div>
      )}

      {/* SOLVED GROUPS */}

      <div className="solved-area">
        {solvedGroups.map((group, i) => (
          <div key={i} className="solved-group">
            <div className="solved-title">
              {group.family}
            </div>

            <div className="solved-words">
              {group.words.map(w => (
                <span key={w} className="solved-word">
                  {w}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* GRID */}

      <div className="grid">
        {tiles.map(word => (
          <button
            key={word}
            className={`
              tile
              ${selected.includes(word) ? "selected" : ""}
              ${pulseWords.includes(word) ? "pulse" : ""}
            `}
            onClick={() => toggleSelect(word)}
          >
            {word}
          </button>
        ))}
      </div>

      <button
        className="submit"
        disabled={selected.length !== 4}
        onClick={checkSelection}
      >
        Submit Selection
      </button>

      {/* DESIGN MODE APPEARS AFTER WIN */}

      {winPhrase && !showWin && (
        <div className="design">
          Design Mode Code:
          <input
            type="password"
            onChange={handleDesignCode}
          />
        </div>
      )}

    </div>
  );
}