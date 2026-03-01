// ===============================
// DAY → TIER CONFIG
// Sat=1 (easiest) through Fri=5 (hardest)
// ===============================

const dayTierMap = {
  0: 2,  // Sunday
  1: 3,  // Monday
  2: 3,  // Tuesday
  3: 4,  // Wednesday
  4: 4,  // Thursday
  5: 5,  // Friday
  6: 1   // Saturday
};

const dayNames = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

const today = new Date().getDay();
const todayTier = dayTierMap[today];
const todayName = dayNames[today];

// ===============================
// DIFFICULTY CONFIG
// ===============================

const difficultyConfig = {
  1: { label: "Accessible",  sub: "A smooth start — trust your instincts",     emoji: "🟢" },
  2: { label: "Moderate",    sub: "Meaning starts to shade and shift",          emoji: "🟡" },
  3: { label: "Challenging", sub: "Connotation is everything",                  emoji: "🟠" },
  4: { label: "Advanced",    sub: "Nuance required — think like a rhetorician", emoji: "🔴" },
  5: { label: "Expert",      sub: "AP Mastery level — bring your full range",   emoji: "🟣" }
};

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

  // Filter families close to today's tier
  const eligibleFamilies = families.filter(f =>
    Math.abs(f.tier - todayTier) <= 1
  );

  shuffleArray(eligibleFamilies);

  const selectedFamilies = eligibleFamilies.slice(0, 4);

  // Calculate dynamic difficulty score
  const avgAbstraction = selectedFamilies.reduce((sum, f) => sum + f.abstraction, 0) / 4;
  const avgPolysemy = selectedFamilies.reduce((sum, f) => sum + f.polysemy, 0) / 4;
  const difficultyScore = ((avgAbstraction + avgPolysemy) / 2).toFixed(1);

  // Update difficulty display with day name
  const config = difficultyConfig[todayTier];

  document.getElementById("difficulty").innerHTML = `
    <div class="difficulty-day">
      ${config.emoji} ${todayName} &mdash; ${config.label}
      <span style="font-weight:400; color:#888; font-size:14px;">
        &nbsp;(${difficultyScore} / 5.0)
      </span>
    </div>
    <div class="difficultySub">${config.sub}</div>
  `;

  // Select 4 words from each family
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

// Color palette: green → teal → amber → red
const solvedColors = [
  "#4caf50",  // green
  "#26a69a",  // teal
  "#ffa726",  // amber
  "#ef5350"   // red
];

function renderBoard(boardWords, families) {

  const grid = document.getElementById("grid");
  const solvedStack = document.getElementById("solvedStack");
  const overlay = document.getElementById("overlay");
  const overlayText = document.getElementById("overlayText");

  grid.innerHTML = "";

  let selected = [];
  let solvedFamilies = [];
  let solvedCount = 0;
  let mistakeCount = 0;

  // Build tiles
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

    const correc