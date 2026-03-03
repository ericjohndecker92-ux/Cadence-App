// ===============================
// DAY -> TIER CONFIG
// Sat=1 (easiest) through Fri=5 (hardest)
// ===============================

const dayTierMap = {
  0: 2,
  1: 3,
  2: 3,
  3: 4,
  4: 4,
  5: 5,
  6: 1
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
  1: { label: "Accessible",  sub: "A smooth start - trust your instincts",     emoji: "🟢" },
  2: { label: "Moderate",    sub: "Meaning starts to shade and shift",          emoji: "🟡" },
  3: { label: "Challenging", sub: "Connotation is everything",                  emoji: "🟠" },
  4: { label: "Advanced",    sub: "Nuance required - think like a rhetorician", emoji: "🔴" },
  5: { label: "Expert",      sub: "AP Mastery level - bring your full range",   emoji: "🟣" }
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
  document.getElementById("streak").innerText = "🔥 Streak: " + cadenceData.streak;
}

updateStreakDisplay();

function handleBoardCompletion() {
  var todayStr = new Date().toDateString();

  if (cadenceData.lastCompleted) {
    var lastDate = new Date(cadenceData.lastCompleted);
    var yesterday = new Date();
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
  .then(function(response) { return response.json(); })
  .then(function(data) { initializeGame(data.families); });

function initializeGame(families) {

  var eligibleFamilies = families.filter(function(f) {
    return Math.abs(f.tier - todayTier) <= 1;
  });

  shuffleArray(eligibleFamilies);

  var selectedFamilies = eligibleFamilies.slice(0, 4);

  var avgAbstraction = selectedFamilies.reduce(function(sum, f) { return sum + f.abstraction; }, 0) / 4;
  var avgPolysemy = selectedFamilies.reduce(function(sum, f) { return sum + f.polysemy; }, 0) / 4;
  var difficultyScore = ((avgAbstraction + avgPolysemy) / 2).toFixed(1);

  var config = difficultyConfig[todayTier];

  document.getElementById("difficulty").innerHTML =
    "<div class='difficulty-day'>" +
    config.emoji + " " + todayName + " &mdash; " + config.label +
    " <span style='font-weight:400; color:#888; font-size:14px;'>(" + difficultyScore + " / 5.0)</span>" +
    "</div>" +
    "<div class='difficultySub'>" + config.sub + "</div>";

  var boardWords = [];

  selectedFamilies.forEach(function(family) {
    shuffleArray(family.words);
    var chosen = family.words.slice(0, 4);
    chosen.forEach(function(word) {
      boardWords.push({ word: word, family: family.name });
    });
  });

  shuffleArray(boardWords);

  renderBoard(boardWords, selectedFamilies);
}

// ===============================
// RENDER BOARD
// ===============================

var solvedColors = [
  "#4caf50",
  "#26a69a",
  "#ffa726",
  "#ef5350"
];

function renderBoard(boardWords, families) {

  var grid = document.getElementById("grid");
  var solvedStack = document.getElementById("solvedStack");
  var overlay = document.getElementById("overlay");
  var overlayText = document.getElementById("overlayText");

  grid.innerHTML = "";

  var selected = [];
  var solvedFamilies = [];
  var solvedCount = 0;
  var mistakeCount = 0;

  boardWords.forEach(function(item) {
    var div = document.createElement("div");
    div.classList.add("tile");
    div.innerText = item.word;
    div.dataset.family = item.family;
    div.addEventListener("click", function() { toggleSelect(div); });
    grid.appendChild(div);
  });

  function toggleSelect(tile) {
    if (tile.classList.contains("solved")) return;

    if (tile.classList.contains("selected")) {
      tile.classList.remove("selected");
      selected = selected.filter(function(t) { return t !== tile; });
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
    var familiesChosen = selected.map(function(t) { return t.dataset.family; });

    var familyCounts = {};
    familiesChosen.forEach(function(f) {
      familyCounts[f] = (familyCounts[f] || 0) + 1;
    });

    var correctFamily = null;
    Object.keys(familyCounts).forEach(function(f) {
      if (familyCounts[f] === 4) { correctFamily = f; }
    });

    var correctCount = Math.max.apply(null, Object.values(familyCounts));

    if (correctFamily) {
      showOverlay("correct", correctCount);
      handleSolve(correctFamily);
    } else {
      mistakeCount++;
      showOverlay("wrong", correctCount);
      setTimeout(function() { shakeTiles(); }, 100);
    }

    setTimeout(function() {
      overlay.classList.add("hidden");
      clearSelection();
    }, 1400);
  }

  function handleSolve(familyName) {
    solvedFamilies.push(familyName);

    var tiles = Array.from(document.querySelectorAll(".tile")).filter(function(t) {
      return t.dataset.family === familyName;
    });

    tiles.forEach(function(tile) {
      tile.classList.remove("selected");
      tile.classList.add("solved");
      tile.style.display = "none";
    });

    var color = solvedColors[solvedCount];
    solvedCount++;

    var solvedDiv = document.createElement("div");
    solvedDiv.classList.add("solvedFamily");
    solvedDiv.style.backgroundColor = color;

    var words = tiles.map(function(t) { return t.innerText; }).join(" • ");
    solvedDiv.innerHTML =
      "<div class='solvedFamily-name'>" + familyName + "</div>" +
      "<div class='solvedFamily-words'>" + words + "</div>";

    solvedStack.appendChild(solvedDiv);

    if (solvedFamilies.length === 4) {
      setTimeout(function() {
        showOverlay("complete", 4);
        handleBoardCompletion();
      }, 400);
    }
  }

  function showOverlay(type, correctCount) {
    var emoji = "";
    var message = "";
    var sub = "";

    if (type === "complete") {
      emoji = "🎉";
      message = "Board Complete!";
      sub = mistakeCount === 0
        ? "Flawless - a perfect read."
        : "Completed with " + mistakeCount + " mistake" + (mistakeCount > 1 ? "s" : "") + ".";
    } else if (type === "correct") {
      emoji = "✅";
      message = "Perfect Match!";
      sub = "Nicely done.";
    } else if (correctCount === 3) {
      emoji = "🟡";
      message = "One Away...";
      sub = "You are close - reconsider one word.";
    } else {
      emoji = "💭";
      message = correctCount + " in common";
      sub = "Keep thinking - tone is subtle.";
    }

    overlayText.innerHTML =
      "<div class='overlay-box'>" +
      "<div class='overlay-emoji'>" + emoji + "</div>" +
      "<div class='overlay-message'>" + message + "</div>" +
      "<div class='overlay-sub'>" + sub + "</div>" +
      "</div>";

    overlay.classList.remove("hidden");
  }

  function shakeTiles() {
    selected.forEach(function(tile) {
      tile.style.animation = "none";
      tile.offsetHeight;
      tile.style.animation = "shake 0.4s ease";
    });
  }

  function clearSelection() {
    selected.forEach(function(tile) {
      tile.classList.remove("selected");
      tile.style.animation = "";
    });
    selected = [];
  }
}

// ===============================
// UTIL
// ===============================

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}