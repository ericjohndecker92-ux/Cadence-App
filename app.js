// ===============================
// DAY CONFIG
// ===============================

const tierMap = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat"
};

const today = new Date().getDay();
const todayTier = tierMap[today];

// ===============================
// STREAK SYSTEM
// ===============================

const STORAGE_KEY = "cadenceData";

let cadenceData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  streak: 0,
  lastCompleted: null
};

function updateStreakDisplay() {
  document.getElementById("streak").innerText =
    "🔥 Streak: " + cadenceData.streak;
}

updateStreakDisplay();

function handleBoardCompletion() {
  const todayStr = new Date().toDateString();

  if (cadenceData.lastCompleted) {
    const lastDate = new Date(cadenceData.lastCompleted);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastDate.toDateString() === yesterday.toDateString()) {
      cadenceData.streak += 1;
    } else if (lastDate.toDateString() !== todayStr) {
      cadenceData.streak = 1;
    }
  } else {
    cadenceData.streak = 1;
  }

  cadenceData.lastCompleted = todayStr;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cadenceData));
  updateStreakDisplay();
}

// ===============================
// LOAD TONE BANK
// ===============================

fetch("toneBank.json")
  .then(response => response.json())
  .then(data => initializeGame(data.families));

function initializeGame(families) {

  // Filter families suitable for today
  const eligibleFamilies = families.filter(f =>
    f.minTier <= todayTier && f.maxTier >= todayTier
  );

  // Shuffle
  shuffleArray(eligibleFamilies);

  // Pick first 4 families
  const selectedFamilies = eligibleFamilies.slice(0, 4);

  // Select 4 words from each
  let boardWords = [];

  selectedFamilies.forEach(family => {
    shuffleArray(family.words);
    const chosen = family.words.slice(0, 4);
    boardWords.push(
      ...chosen.map(word => ({
        word,
        family: family.name
      }))
    );
  });

  shuffleArray(boardWords);

  renderBoard(boardWords, selectedFamilies);
}

// ===============================
// RENDER BOARD
// ===============================

function renderBoard(boardWords, families) {

  const grid = document.getElementById("grid");
  const solvedStack = document.getElementById("solvedStack");
  const overlay = document.getElementById("overlay");
  const overlayText = document.getElementById("overlayText");

  grid.innerHTML = "";

  let selected = [];
  let solvedFamilies = [];

  boardWords.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("tile");
    div.innerText = item.word;
    div.dataset.family = item.family;

    div.addEventListener("click", () => toggleSelect(div));

    grid.appendChild(div);
  });

  function toggleSelect(tile) {
    if (tile.classList.contains("solved")) return;

    if (tile.classList.contains("selected")) {
      tile.classList.remove("selected");
      selected = selected.filter(t => t !== tile);
    } else {
      if (selected.length < 4) {
        tile.classList.add("selected");
        selected.push(tile);
      }
    }

    if (selected.length === 4) {
      checkSelection();
    }
  }

  function checkSelection() {
    const familiesChosen = selected.map(t => t.dataset.family);

    const familyCounts = {};
    familiesChosen.forEach(f => {
      familyCounts[f] = (familyCounts[f] || 0) + 1;
    });

    const correctFamily = Object.keys(familyCounts).find(
      f => familyCounts[f] === 4
    );

    const correctCount = Math.max(...Object.values(familyCounts));

    showOverlay(correctCount);

    if (correctFamily) {
      handleSolve(correctFamily);
    }

    setTimeout(() => {
      overlay.classList.add("hidden");
      clearSelection();
    }, 1200);
  }

  function handleSolve(familyName) {
    solvedFamilies.push(familyName);

    const tiles = Array.from(document.querySelectorAll(".tile"))
      .filter(t => t.dataset.family === familyName);

    tiles.forEach(tile => {
      tile.classList.remove("selected");
      tile.classList.add("solved");
      tile.style.display = "none";
    });

    const solvedDiv = document.createElement("div");
    solvedDiv.classList.add("solvedFamily");

    solvedDiv.innerHTML = `
      <div style="font-weight:600; margin-bottom:6px;">
        ${familyName}
      </div>
      <div>
        ${tiles.map(t => t.innerText).join(" • ")}
      </div>
    `;

    solvedStack.appendChild(solvedDiv);

    if (solvedFamilies.length === 4) {
      setTimeout(() => {
        overlayText.innerText = "Board Complete";
        overlay.classList.remove("hidden");
        handleBoardCompletion();
      }, 300);
    }
  }

  function showOverlay(number) {
    overlayText.innerText = number + " Correct";
    overlay.classList.remove("hidden");
  }

  function clearSelection() {
    selected.forEach(tile => tile.classList.remove("selected"));
    selected = [];
  }
}

// ===============================
// UTIL
// ===============================

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}