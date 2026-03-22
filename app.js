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
// MODAL
// ===============================

document.getElementById("methodBtn").addEventListener("click", function() {
  document.getElementById("methodModal").classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", function() {
  document.getElementById("methodModal").classList.add("hidden");
});

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
  localStorage.setIt