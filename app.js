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
// SOLVE PRAISE LINES
// ===============================

const solveLines = [
  "Sharp instincts.",
  "Tone recognized.",
  "You felt that one.",
  "Connotation caught.",
  "That's the nuance.",
  "Nicely read.",
  "Meaning mastered.",
  "Well tuned.",
  "Context unlocked.",
  "Precise thinking."
];

function getRandomSolveLine() {
  return solveLines[Math.floor(Math.random() * solveLines.length)];
}

// ===============================
// ABOUT MODAL CONTENT
// ===============================

function buildModalContent() {
  return `
    <h2>About this method</h2>
    <p class="modal-opening">This isn't a word game. It's a thinking game.</p>
    <p>Cadence trains the skill that separates good readers from great ones: the ability to hear how a writer sounds, not just what they say. That's tone — and it's one of the most tested, most misunderstood skills in AP Language and Composition.</p>

    <h3>Why Tone Is Hard</h3>
    <p>Most students can tell you a passage is "sad" or "angry." Fewer can tell you the difference between <em>melancholic</em> and <em>mournful</em>, or explain why <em>sardonic</em> and <em>sarcastic</em> aren't interchangeable. The problem isn't vocabulary — it's that tone words exist in families, and the boundaries between families are deliberately blurry.</p>
    <p>Cadence is built around that blurriness. Every puzzle is designed to make you feel the pull of the wrong answer before you find the right one.</p>

    <h3>How the Puzzle Works</h3>
    <p>Each day's board contains 16 words drawn from 4 tone families. Your job is to sort them — four words to a family — by recognizing the shared emotional or rhetorical register beneath the surface meaning.</p>
    <p>The catch: words are chosen specifically because they could belong to more than one family. <em>Wistful</em> feels nostalgic — but is it melancholic? <em>Fervent</em> sounds urgent — but is it reverent? That tension is the point.</p>

    <h3>The Weekly Difficulty Arc</h3>
    <p>Cadence gets harder as the week progresses. This is intentional and structured.</p>
    <table class="modal-table">
      <thead>
        <tr><th>Day</th><th>Tier</th><th>Level</th><th>What's Being Tested</th></tr>
      </thead>
      <tbody>
        <tr><td>Saturday</td><td>1</td><td>Accessible</td><td>Immediate emotional recognition</td></tr>
        <tr><td>Sunday</td><td>2</td><td>Moderate</td><td>Emotional shading and distinction</td></tr>
        <tr><td>Monday</td><td>3</td><td>Moderate</td><td>Connotation over denotation</td></tr>
        <tr><td>Tuesday</td><td>3</td><td>Challenging</td><td>Rhetorical stance vs. feeling</td></tr>
        <tr><td>Wednesday</td><td>4</td><td>Challenging</td><td>Layered, context-dependent meaning</td></tr>
        <tr><td>Thursday</td><td>4</td><td>Advanced</td><td>Nuance and unstable word boundaries</td></tr>
        <tr><td>Friday</td><td>5</td><td>Expert</td><td>Full rhetorical range — AP mastery level</td></tr>
      </tbody>
    </table>
    <p>Saturday's board draws from families like Joyful and Serene — emotionally immediate, low abstraction, one clear meaning per word. By Friday, you're working with families like Ambivalent, Didactic, and Scathing, where words score 4–5 on both abstraction and semantic complexity.</p>
    <p>The same brain skill is being used all week — it's just being asked to work at greater and greater depth.</p>

    <h3>The Science Behind the Difficulty</h3>
    <p>Every word family in Cadence is scored on two active dimensions — with a third coming soon.</p>
    <p><strong>Abstraction</strong> measures how conceptual vs. emotionally concrete a tone is. <em>Cheerful</em> is low abstraction — you feel it immediately. <em>Didactic</em> is high abstraction — you need to understand what rhetorical mode it describes before you can place it.</p>
    <p><strong>Polysemy</strong> measures how many distinct meanings a word can carry. High polysemy means a word resists easy sorting. <em>Dry</em> could be ironic. It could be analytical. Context decides — and in Cadence, you don't get context. That's the challenge.</p>
    <p><strong>Semantic Overlap</strong> (coming in a future update) will formally score how much vocabulary a family shares with its neighbors. The higher the overlap, the harder the sort.</p>
    <p>The difficulty score shown on each board — displayed as X.X / 5.0 — is the average of abstraction and polysemy across that day's four families. A Friday board regularly scores 4.0–5.0. A Saturday board scores 1.0–1.5.</p>

    <h3>The Bloom's Taxonomy Connection</h3>
    <p>Cadence maps directly onto Bloom's Taxonomy of cognitive skills — the same framework used in AP curriculum design.</p>
    <table class="modal-table">
      <thead>
        <tr><th>Tier</th><th>Bloom's Level</th><th>What It Looks Like in Cadence</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>Remember</td><td>Recognize a tone word you've seen before</td></tr>
        <tr><td>2</td><td>Understand</td><td>Distinguish between similar emotional tones</td></tr>
        <tr><td>3</td><td>Apply</td><td>Place a word in its rhetorical family</td></tr>
        <tr><td>4</td><td>Analyze</td><td>Identify why a word belongs here and not there</td></tr>
        <tr><td>5</td><td>Evaluate</td><td>Navigate maximum ambiguity with full rhetorical awareness</td></tr>
      </tbody>
    </table>
    <p>A student who can solve a Friday board is operating at Bloom's Level 5. That's the goal.</p>

    <h3>For Teachers</h3>
    <p>Cadence works as a daily warm-up, a bell-ringer, or a discussion starter. When a student gets one wrong, that's not failure — that's data. Ask them: <em>Why did you put that word there? What did it feel like? What would have to be true for it to belong in that family?</em></p>
    <p>That conversation is AP Lang in its purest form.</p>
    <p>Word families are drawn from AP Language and Composition tone lists, SAT and PSAT vocabulary sources, and established academic tone banks. Every family is curated — not generated — and scored by hand before entering the puzzle.</p>

    <h3>Go Deeper — Academic Resources</h3>
    <ul class="modal-links">
      <li><a href="https://apcentral.collegeboard.org/courses/ap-english-language-and-composition/course" target="_blank">AP Language and Composition Course and Exam Description</a> — College Board's official framework for rhetorical analysis</li>
      <li><a href="https://apcentral.collegeboard.org/courses/ap-english-literature-and-composition/course" target="_blank">AP Literature and Composition Course and Exam Description</a> — College Board</li>
      <li><a href="https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/" target="_blank">Bloom's Taxonomy</a> — Vanderbilt Center for Teaching</li>
      <li><a href="https://owl.purdue.edu/owl/general_writing/the_writing_process/rhetorical_situation/index.html" target="_blank">The Rhetorical Triangle (Ethos, Pathos, Logos)</a> — Purdue OWL</li>
      <li><a href="https://plato.stanford.edu/entries/ambiguity/" target="_blank">Polysemy and Word Meaning in Linguistics</a> — Stanford Encyclopedia of Philosophy</li>
      <li><a href="https://writingcenter.unc.edu/tips-and-tools/style/" target="_blank">Register and Tone in Academic Writing</a> — UNC Writing Center</li>
      <li><a href="https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing" target="_blank">The SAT Reading and Writing Framework</a> — College Board</li>
    </ul>

    <h3>Citations &amp; Scholarly Sources</h3>
    <p class="modal-citations-intro">The design of Cadence draws on peer-reviewed research, standardized curriculum frameworks, and established linguistic theory. The following sources inform the difficulty model, word family construction, and pedagogical rationale.</p>

    <h4>Cognitive Framework</h4>
    <ul class="modal-citations">
      <li>Bloom, B. S., Engelhart, M. D., Furst, E. J., Hill, W. H., &amp; Krathwohl, D. R. (1956). <em>Taxonomy of educational objectives: The classification of educational goals. Handbook I: Cognitive domain.</em> David McKay Company.</li>
      <li>Krathwohl, D. R. (2002). A revision of Bloom's Taxonomy: An overview. <em>Theory Into Practice, 41</em>(4), 212–218. <a href="https://doi.org/10.1207/s15430421tip4104_2" target="_blank">https://doi.org/10.1207/s15430421tip4104_2</a></li>
      <li>Anderson, L. W., &amp; Krathwohl, D. R. (Eds.). (2001). <em>A taxonomy for learning, teaching, and assessing: A revision of Bloom's educational objectives.</em> Longman.</li>
    </ul>

    <h4>Rhetorical Theory &amp; Tone</h4>
    <ul class="modal-citations">
      <li>Aristotle. (2007). <em>On rhetoric: A theory of civic discourse</em> (G. A. Kennedy, Trans.). Oxford University Press. (Original work composed c. 350 BCE)</li>
      <li>Booth, W. C. (1961). <em>The rhetoric of fiction.</em> University of Chicago Press.</li>
      <li>Burke, K. (1969). <em>A rhetoric of motives.</em> University of California Press.</li>
      <li>Fahnestock, J., &amp; Secor, M. (1991). The rhetoric of literary criticism. In C. Bazerman &amp; J. Paradis (Eds.), <em>Textual dynamics of the professions</em> (pp. 76–96). University of Wisconsin Press.</li>
    </ul>

    <h4>Linguistics — Polysemy &amp; Word Meaning</h4>
    <ul class="modal-citations">
      <li>Pustejovsky, J. (1995). <em>The generative lexicon.</em> MIT Press.</li>
      <li>Lyons, J. (1977). <em>Semantics</em> (Vol. 1). Cambridge University Press.</li>
      <li>Cruse, D. A. (1986). <em>Lexical semantics.</em> Cambridge University Press.</li>
      <li>Murphy, M. L. (2010). <em>Lexical meaning.</em> Cambridge University Press.</li>
      <li>Geeraerts, D. (2010). <em>Theories of lexical semantics.</em> Oxford University Press.</li>
    </ul>

    <h4>Register, Style &amp; Academic Language</h4>
    <ul class="modal-citations">
      <li>Biber, D., &amp; Conrad, S. (2009). <em>Register, genre, and style.</em> Cambridge University Press.</li>
      <li>Halliday, M. A. K. (1994). <em>An introduction to functional grammar</em> (2nd ed.). Edward Arnold.</li>
      <li>Coxhead, A. (2000). A new academic word list. <em>TESOL Quarterly, 34</em>(2), 213–238. <a href="https://doi.org/10.2307/3587951" target="_blank">https://doi.org/10.2307/3587951</a></li>
    </ul>

    <h4>AP Curriculum Frameworks</h4>
    <ul class="modal-citations">
      <li>College Board. (2024). <em>AP English Language and Composition: Course and exam description.</em> <a href="https://apcentral.collegeboard.org/courses/ap-english-language-and-composition/course" target="_blank">apcentral.collegeboard.org</a></li>
      <li>College Board. (2024). <em>AP English Literature and Composition: Course and exam description.</em> <a href="https://apcentral.collegeboard.org/courses/ap-english-literature-and-composition/course" target="_blank">apcentral.collegeboard.org</a></li>
      <li>College Board. (2024). <em>SAT Suite of Assessments: Evidence-based reading and writing framework.</em> <a href="https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing" target="_blank">satsuite.collegeboard.org</a></li>
    </ul>

    <h4>Vocabulary Acquisition &amp; Depth of Knowledge</h4>
    <ul class="modal-citations">
      <li>Nation, I. S. P. (2001). <em>Learning vocabulary in another language.</em> Cambridge University Press.</li>
      <li>Beck, I. L., McKeown, M. G., &amp; Kucan, L. (2013). <em>Bringing words to life: Robust vocabulary instruction</em> (2nd ed.). Guilford Press.</li>
      <li>Webb, S. (2007). The effects of repetition on vocabulary knowledge. <em>Applied Linguistics, 28</em>(1), 46–65. <a href="https://doi.org/10.1093/applin/aml048" target="_blank">https://doi.org/10.1093/applin/aml048</a></li>
      <li>Webb, N. L. (1997). <em>Criteria for alignment of expectations and assessments in mathematics and science education</em> (Research Monograph No. 6). National Institute for Science Education.</li>
    </ul>

    <h4>Google Scholar Search Terms for Further Research</h4>
    <p>For teachers and researchers who want to go deeper, the following search strings in <a href="https://scholar.google.com" target="_blank">Google Scholar</a> will surface peer-reviewed work directly relevant to Cadence's design:</p>
    <ul class="modal-search-terms">
      <li>"tone recognition reading comprehension secondary"</li>
      <li>"polysemy vocabulary instruction AP English"</li>
      <li>"rhetorical analysis cognitive load"</li>
      <li>"Bloom's taxonomy vocabulary acquisition"</li>
      <li>"register academic language development"</li>
      <li>"lexical ambiguity reading fluency"</li>
      <li>"connotation denotation instruction secondary"</li>
    </ul>

    <p class="modal-footer">Cadence is updated daily. Streaks reset if you miss a day — come back tomorrow.</p>
  `;
}

// ===============================
// MODAL
// ===============================

window.addEventListener("load", function() {

  // Populate About modal content
  var modalBody = document.getElementById("methodContent");
  if (modalBody) {
    modalBody.innerHTML = buildModalContent();
  }

  document.getElementById("methodBtn").addEventListener("click", function() {
    document.getElementById("methodModal").classList.remove("hidden");
  });

  document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("methodModal").classList.add("hidden");
  });

  document.getElementById("completionDismiss").addEventListener("click", function() {
    document.getElementById("completionScreen").classList.add("hidden");
  });

  // ===============================
  // STREAK SYSTEM
  // ===============================

  const STORAGE_KEY = "cadenceData";

  var cadenceData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    streak: 0,
    lastCompleted: null
  };

  function updateStreakDisplay() {
    document.getElementById("streak").innerText = "🔥 Streak: " + cadenceData.streak;
  }

  updateStreakDisplay();

  function handleBoardCompletion(mistakeCount) {
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

    showCompletionScreen(mistakeCount, cadenceData.streak);
  }

  // ===============================
  // COMPLETION SCREEN
  // ===============================

  function showCompletionScreen(mistakeCount, streak) {
    var emoji, headline, sub;

    if (mistakeCount === 0) {
      emoji = "🏆";
      headline = "Flawless Board";
      sub = "A perfect read. Every tone, exactly right.";
    } else if (mistakeCount === 1) {
      emoji = "🎯";
      headline = "Sharp Thinking";
      sub = "One stumble, four families found. Strong work.";
    } else if (mistakeCount === 2) {
      emoji = "🌀";
      headline = "Tone Unlocked";
      sub = "The nuance was real — you worked through it.";
    } else {
      emoji = "📖";
      headline = "Board Complete";
      sub = "Every puzzle is a lesson in disguise.";
    }

    var mistakeLabel = mistakeCount === 0
      ? "No mistakes"
      : mistakeCount + " mistake" + (mistakeCount > 1 ? "s" : "");

    document.getElementById("completionEmoji").innerText = emoji;
    document.getElementById("completionHeadline").innerText = headline;
    document.getElementById("completionSub").innerText = sub;
    document.getElementById("completionMistakes").innerText = mistakeLabel;
    document.getElementById("completionStreak").innerText = "🔥 " + streak + "-day streak";

    document.getElementById("completionScreen").classList.remove("hidden");
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
          overlay.classList.add("hidden");
          handleBoardCompletion(mistakeCount);
        }, 400);
      }
    }

    function showOverlay(type, correctCount) {
      var emoji = "";
      var message = "";
      var sub = "";

      if (type === "correct") {
        emoji = "✅";
        message = "Perfect Match!";
        sub = getRandomSolveLine();
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

});
