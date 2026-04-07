const DEFAULT_ROUNDS = 10;

const elements = {
  image: document.getElementById("game-image"),
  optionsContainer: document.getElementById("options-container"),
  scoreEl: document.getElementById("score"),
  roundCurrentEl: document.getElementById("round-current"),
  roundTotalEl: document.getElementById("round-total"),
  nextBtn: document.getElementById("next-btn"),
  feedback: document.getElementById("feedback"),
  feedbackText: document.getElementById("feedback-text"),
  loader: document.getElementById("loader"),
  categoryBadge: document.getElementById("game-category"),
  emojiBadge: document.getElementById("game-emoji"),
  categorySelect: document.getElementById("quiz-category"),
  audioBtn: document.getElementById("quiz-audio-btn"),
  quizStage: document.getElementById("quiz-stage"),
  quizFinish: document.getElementById("quiz-finish"),
  quizEmpty: document.getElementById("quiz-empty"),
  finalScore: document.getElementById("final-score"),
  finalTotal: document.getElementById("final-total"),
  quizMessage: document.getElementById("quiz-message"),
  bestScore: document.getElementById("best-score"),
  restartBtn: document.getElementById("restart-btn"),
  reviewList: document.getElementById("review-list"),
  learnLink: document.getElementById("learn-link")
};

let score = 0;
let roundIndex = 0;
let currentWord = null;
let currentOptions = [];
let hasAnswered = false;
let quizWords = [];
let currentCategory = "All";
let wrongAnswers = [];

setupCategorySelect();
startQuiz();

function setupCategorySelect() {
  const categories = getAvailableCategories();

  elements.categorySelect.innerHTML = "";
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    elements.categorySelect.appendChild(option);
  });

  elements.categorySelect.value = currentCategory;

  elements.categorySelect.addEventListener("change", () => {
    currentCategory = elements.categorySelect.value;
    startQuiz();
  });
}

function getAvailableCategories() {
  if (Array.isArray(window.CATEGORIES) && window.CATEGORIES.length > 0) {
    return window.CATEGORIES;
  }

  const categorySet = new Set();

  WORDS.forEach(word => {
    if (word.category) {
      categorySet.add(word.category);
    }
  });

  const categories = Array.from(categorySet);
  categories.sort();

  if (categories.length === 0) {
    return ["All"];
  }

  return ["All", ...categories];
}

function getWordsForCategory(category) {
  if (category === "All") {
    return [...WORDS];
  }

  if (typeof getWordsByCategory === "function") {
    return [...getWordsByCategory(category)];
  }

  return WORDS.filter(word => word.category === category);
}

function startQuiz() {
  const sourceWords = getWordsForCategory(currentCategory);

  if (sourceWords.length < 2) {
    showEmptyState();
    return;
  }

  score = 0;
  roundIndex = 0;
  wrongAnswers = [];
  quizWords = buildQuizWords(sourceWords);

  elements.scoreEl.textContent = score;
  elements.roundTotalEl.textContent = quizWords.length;
  elements.finalTotal.textContent = quizWords.length;
  elements.learnLink.href = currentCategory === "All"
    ? "learn.html"
    : `learn.html?category=${encodeURIComponent(currentCategory)}`;

  elements.quizEmpty.classList.add("hidden");
  elements.quizFinish.classList.add("hidden");
  elements.quizStage.classList.remove("hidden");

  loadRound();
}

function showEmptyState() {
  elements.quizStage.classList.add("hidden");
  elements.quizFinish.classList.add("hidden");
  elements.quizEmpty.classList.remove("hidden");
}

function buildQuizWords(sourceWords) {
  if (typeof getRandomWords === "function") {
    return getRandomWords(Math.min(DEFAULT_ROUNDS, sourceWords.length), currentCategory);
  }

  const shuffled = [...sourceWords];
  shuffleArray(shuffled);
  return shuffled.slice(0, Math.min(DEFAULT_ROUNDS, shuffled.length));
}

function loadRound() {
  if (roundIndex >= quizWords.length) {
    showFinishScreen();
    return;
  }

  hasAnswered = false;
  currentWord = quizWords[roundIndex];
  currentOptions = buildOptions(currentWord);

  elements.roundCurrentEl.textContent = roundIndex + 1;
  elements.feedback.className = "feedback quiz-feedback hidden";
  elements.nextBtn.classList.add("hidden");

  updateWordMeta(currentWord);
  loadImage(currentWord);
  renderOptions(currentOptions);
}

function updateWordMeta(wordData) {
  elements.categoryBadge.textContent = wordData.category || currentCategory || "General";
  elements.emojiBadge.textContent = wordData.emoji || "📘";
}

function loadImage(wordData) {
  elements.loader.classList.remove("hidden");
  elements.image.classList.add("hidden");
  elements.image.alt = wordData.word || "Quiz image";

  const img = new Image();

  img.onload = () => {
    elements.image.src = wordData.image;
    elements.image.classList.remove("hidden");
    elements.loader.classList.add("hidden");
  };

  img.onerror = () => {
    elements.image.src = "";
    elements.image.alt = "Image not available";
    elements.image.classList.remove("hidden");
    elements.loader.classList.add("hidden");
  };

  img.src = wordData.image;
}

function buildOptions(correctWord) {
  const sameCategoryPool = getWordsForCategory(currentCategory);
  const allOtherWords = WORDS.filter(word => !isSameWord(word, correctWord));
  const categoryDistractors = sameCategoryPool.filter(word => !isSameWord(word, correctWord));

  shuffleArray(categoryDistractors);
  shuffleArray(allOtherWords);

  const options = [correctWord];
  const targetCount = Math.min(4, WORDS.length);

  categoryDistractors.forEach(word => {
    if (options.length < targetCount && !options.some(option => isSameWord(option, word))) {
      options.push(word);
    }
  });

  allOtherWords.forEach(word => {
    if (options.length < targetCount && !options.some(option => isSameWord(option, word))) {
      options.push(word);
    }
  });

  shuffleArray(options);
  return options;
}

function renderOptions(options) {
  elements.optionsContainer.innerHTML = "";

  options.forEach((wordData, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.innerHTML = `
      <span class="option-number">${index + 1}</span>
      <span class="option-label">${capitalize(wordData.word)}</span>
    `;

    button.addEventListener("click", () => checkAnswer(wordData, button));
    elements.optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedWord, selectedButton) {
  if (hasAnswered) {
    return;
  }

  hasAnswered = true;

  const optionButtons = elements.optionsContainer.querySelectorAll(".option");
  optionButtons.forEach(button => {
    button.disabled = true;
    button.style.pointerEvents = "none";
  });

  const isCorrect = isSameWord(selectedWord, currentWord);

  optionButtons.forEach(button => {
    const label = button.querySelector(".option-label");
    if (!label) {
      return;
    }

    if (label.textContent.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      button.classList.add("correct");
    }
  });

  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
    elements.scoreEl.textContent = score;
    showFeedback("Correct! Great job!", true);
  } else {
    selectedButton.classList.add("wrong");
    wrongAnswers.push(currentWord);
    showFeedback(`Almost! The correct answer is "${capitalize(currentWord.word)}".`, false);
  }

  elements.nextBtn.innerHTML = roundIndex === quizWords.length - 1
    ? `See Results <i class="fas fa-arrow-right"></i>`
    : `Next Question <i class="fas fa-arrow-right"></i>`;

  elements.nextBtn.classList.remove("hidden");
}

function showFeedback(message, isCorrect) {
  elements.feedbackText.textContent = message;
  elements.feedback.classList.remove("hidden");
  elements.feedback.classList.remove("correct-state", "wrong-state");
  elements.feedback.classList.add(isCorrect ? "correct-state" : "wrong-state");
}

function showFinishScreen() {
  elements.quizStage.classList.add("hidden");
  elements.quizFinish.classList.remove("hidden");

  elements.finalScore.textContent = score;

  const bestKey = getBestScoreKey();
  const savedBest = Number(localStorage.getItem(bestKey)) || 0;
  const best = Math.max(savedBest, score);

  localStorage.setItem(bestKey, String(best));
  elements.bestScore.textContent = best;

  const percentage = Math.round((score / quizWords.length) * 100);

  if (percentage === 100) {
    elements.quizMessage.textContent = "Perfect score — amazing work!";
  } else if (percentage >= 80) {
    elements.quizMessage.textContent = "Great job! You really know these words.";
  } else if (percentage >= 60) {
    elements.quizMessage.textContent = "Nice work! A little more practice and you will do even better.";
  } else {
    elements.quizMessage.textContent = "Good try! Review the missed words below and play again.";
  }

  renderWrongAnswers();
}

function renderWrongAnswers() {
  elements.reviewList.innerHTML = "";

  if (wrongAnswers.length === 0) {
    const card = document.createElement("div");
    card.className = "quiz-review-card quiz-review-success";
    card.innerHTML = `
      <div class="quiz-review-top">
        <div class="quiz-review-word">You got them all right!</div>
      </div>
      <p class="quiz-review-definition">No review needed this time.</p>
    `;
    elements.reviewList.appendChild(card);
    return;
  }

  wrongAnswers.forEach(wordData => {
    const card = document.createElement("article");
    card.className = "quiz-review-card";
    card.innerHTML = `
      <div class="quiz-review-top">
        <div>
          <div class="quiz-review-word">${wordData.emoji || "📘"} ${capitalize(wordData.word)}</div>
          <div class="quiz-review-category">${wordData.category || "General"}</div>
        </div>
      </div>
      <p class="quiz-review-definition">${wordData.definition || ""}</p>
      <p class="quiz-review-example">${wordData.example ? `"${wordData.example}"` : ""}</p>
    `;
    elements.reviewList.appendChild(card);
  });
}

function getBestScoreKey() {
  return currentCategory === "All"
    ? "wordSproutQuizBest_All"
    : `wordBuddiesQuizBest_${currentCategory}`;
}

function goToNextRound() {
  roundIndex++;
  loadRound();
}

function speakCurrentWord() {
  if (!("speechSynthesis" in window) || !currentWord) {
    return;
  }

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(currentWord.word);
  utterance.pitch = 1.1;
  utterance.rate = 0.9;
  utterance.lang = "en-US";

  speechSynthesis.speak(utterance);
}

function isSameWord(firstWord, secondWord) {
  const firstId = firstWord.id || firstWord.word;
  const secondId = secondWord.id || secondWord.word;
  return firstId === secondId;
}

function capitalize(text) {
  if (!text) {
    return "";
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

function shuffleArray(array) {
  for (let index = array.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }

  return array;
}

elements.nextBtn.addEventListener("click", goToNextRound);
elements.restartBtn.addEventListener("click", startQuiz);
elements.audioBtn.addEventListener("click", speakCurrentWord);

document.addEventListener("keydown", event => {
  if (!elements.quizFinish.classList.contains("hidden")) {
    if (event.key === "Enter") {
      startQuiz();
    }
    return;
  }

  if (elements.quizStage.classList.contains("hidden")) {
    return;
  }

  if (!hasAnswered) {
    const keyNumber = Number(event.key);

    if (keyNumber >= 1 && keyNumber <= currentOptions.length) {
      const targetButton = elements.optionsContainer.children[keyNumber - 1];
      if (targetButton) {
        targetButton.click();
      }
    }

    if (event.key === " " && document.activeElement.tagName !== "BUTTON") {
      event.preventDefault();
      speakCurrentWord();
    }
  } else if (event.key === "Enter") {
    goToNextRound();
  }
});