// ===============================
// DAY → TIER CONFIG
// Sat=1 (easiest) through Fri=5 (hardest)
// Sun=2 (gentle step up from Saturday)
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

const today = new Date().getDay();
const todayTier = dayTierMap[today];

// ===============================
// DIFFICULTY LABELS
// ===============================

const difficultyConfig = {
  1: { label: "Accessible",    sub: "Smooth Start"        },
  2: { label: "Moderate",      sub: "Building Complexity" },
  3: { label: "Challenging",   sub: "Shades of Meaning"   },
  4: { label: "Advanced",      sub: "Nuance Required"     },
  5: { label: "Expert",        sub: "AP Mastery Level"    }
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

  // Filter families whose tier is close to today's tier
  const eligibleFamilies = families.filter(f =>
    Math.abs(f.tier - todayTier) <= 1
  );

  // Shuffle eligible families
  shuffleArray(eligibleFamilies);

  // Pick 4 families
  const selectedFamilies = eligibleFamilies.slice(0, 4);

  // Calculate dynamic difficulty score
  const avgAbstraction = selectedFamilies.reduce((sum, f) => sum + f.abstraction, 0) / 4;
  const avgPolysemy = selectedFamilies.reduce((sum, f) => sum + f.polysemy, 0) / 4;
  const difficultyScore = ((avgAbstraction + avgPolysemy) / 2).toFixed(1);

  // Update difficulty display
  const config = difficultyConfig[todayTier];
  document.getElementById("difficultyScore").innerText = difficultyScore;
  document.getElementById("difficultyLabel").innerText = config.label;
  document.getElementById("difficultySub").innerText = config.sub;

  // Select 4 words from each family
  let boardWords = [];

  selectedFamilies.forEach(family => {
    shuffleArray(family.words);
    const chosen = family.words.slice(0, 4);
    boardWords.push(
      ...chosen.map(word => ({
        wor