const words = [
  "Irony","Metaphor","Simile","Allegory",
  "River","Mountain","Ocean","Desert",
  "Justice","Truth","Power","Freedom",
  "Apple","Pear","Peach","Plum"
];

let selected = [];
const grid = document.getElementById("grid");
const overlay = document.getElementById("overlay");
const overlayText = document.getElementById("overlayText");
const solvedStack = document.getElementById("solvedStack");

words.forEach(word => {
  const div = document.createElement("div");
  div.classList.add("tile");
  div.innerText = word;
  div.addEventListener("click", () => toggleSelect(div));
  grid.appendChild(div);
});

function toggleSelect(tile) {
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
  const correct = Math.floor(Math.random() * 5);
  overlayText.innerText = correct + " Correct";
  overlay.classList.remove("hidden");

  setTimeout(() => {
    overlay.classList.add("hidden");
    selected.forEach(t => t.classList.remove("selected"));
    selected = [];
  }, 1500);
}

document.getElementById("methodBtn").addEventListener("click", () => {
  document.getElementById("methodModal").classList.remove("hidden");
  document.getElementById("methodContent").innerText =
    "Cadence uses a weighted difficulty model based on lexical frequency, abstraction level, polysemy, category obscurity, and misdirection density.";
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("methodModal").classList.add("hidden");
});