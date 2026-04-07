const elements = {
  word: document.getElementById("word"),
  phonetic: document.getElementById("phonetic"),
  definition: document.getElementById("definition"),
  example: document.getElementById("example"),
  audioBtn: document.getElementById("play-audio"),
  image: document.getElementById("word-image"),
  prevBtn: document.getElementById("prev-word"),
  nextBtn: document.getElementById("next-word"),
  currentEl: document.getElementById("current"),
  totalEl: document.getElementById("total"),
  loader: document.getElementById("loader"),
  category: document.getElementById("category"),
  emoji: document.getElementById("emoji")
};

const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category") || "All";

let currentWords = getAvailableWords();
let currentWordIndex = getSavedIndex();

if (currentWords.length === 0) {
  currentWords = Array.isArray(WORDS) ? WORDS : [];
  currentWordIndex = 0;
}

if (currentWords.length === 0) {
  showNoWordsMessage();
} else {
  currentWordIndex = clamp(currentWordIndex, 0, currentWords.length - 1);
  elements.totalEl.textContent = currentWords.length;
  loadWord(currentWordIndex);
}

function getAvailableWords() {
  if (!Array.isArray(WORDS)) {
    return [];
  }

  if (selectedCategory === "All") {
    return WORDS;
  }

  if (typeof getWordsByCategory === "function") {
    return getWordsByCategory(selectedCategory);
  }

  return WORDS.filter(word => word.category === selectedCategory);
}

function getSavedIndex() {
  const saved = Number(localStorage.getItem(getStorageKey("index")));
  return Number.isInteger(saved) ? saved : 0;
}

function saveIndex(index) {
  localStorage.setItem(getStorageKey("index"), index);
}

function getStorageKey(type) {
  return `wordSproutLearn_${selectedCategory}_${type}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function loadWord(index) {
  const wordData = currentWords[index];

  if (!wordData) {
    return;
  }

  elements.word.textContent = capitalize(wordData.word);
  elements.phonetic.textContent = wordData.phonetic || "";
  elements.definition.textContent = wordData.definition || "";
  elements.example.textContent = wordData.example ? `"${wordData.example}"` : "";
  elements.currentEl.textContent = index + 1;

  if (elements.category) {
    elements.category.textContent = wordData.category || "General";
  }

  if (elements.emoji) {
    elements.emoji.textContent = wordData.emoji || "";
  }

  saveIndex(index);
  saveViewedWord(wordData);

  loadImage(wordData);

  if ("speechSynthesis" in window) {
    elements.audioBtn.disabled = false;
    elements.audioBtn.onclick = () => speakWord(wordData.word);
  } else {
    elements.audioBtn.disabled = true;
  }

  updateButtons();
}

function loadImage(wordData) {
  elements.loader.classList.remove("hidden");
  elements.image.classList.add("hidden");
  elements.image.alt = wordData.word || "Word image";

  const img = new Image();

  img.onload = () => {
    elements.image.src = wordData.image;
    elements.image.classList.remove("hidden");
    elements.loader.classList.add("hidden");
  };

  img.onerror = () => {
    elements.image.src = "";
    elements.image.alt = "Image not available";
    elements.loader.classList.add("hidden");
    elements.image.classList.remove("hidden");
  };

  img.src = wordData.image;
}

function speakWord(word) {
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.pitch = 1.2;
  utterance.rate = 0.9;
  utterance.lang = "en-US";

  speechSynthesis.speak(utterance);
}

function updateButtons() {
  elements.prevBtn.disabled = currentWordIndex === 0;
  elements.nextBtn.disabled = currentWordIndex === currentWords.length - 1;

  if (currentWordIndex === currentWords.length - 1) {
    elements.nextBtn.innerHTML = `Finished <i class="fas fa-check"></i>`;
  } else {
    elements.nextBtn.innerHTML = `Next <i class="fas fa-arrow-right"></i>`;
  }
}

function saveViewedWord(wordData) {
  const saved = JSON.parse(localStorage.getItem("wordSproutViewedWords") || "[]");
  const wordId = wordData.id || wordData.word;

  if (!saved.includes(wordId)) {
    saved.push(wordId);
    localStorage.setItem("wordSproutViewedWords", JSON.stringify(saved));
  }
}

function showNoWordsMessage() {
  elements.word.textContent = "No words found";
  elements.phonetic.textContent = "";
  elements.definition.textContent = "Please add vocabulary to data.js.";
  elements.example.textContent = "";
  elements.currentEl.textContent = "0";
  elements.totalEl.textContent = "0";
  elements.loader.classList.add("hidden");
  elements.image.classList.add("hidden");
  elements.audioBtn.disabled = true;
  elements.prevBtn.disabled = true;
  elements.nextBtn.disabled = true;
}

function capitalize(text) {
  if (!text) {
    return "";
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

elements.prevBtn.addEventListener("click", () => {
  if (currentWordIndex > 0) {
    currentWordIndex--;
    loadWord(currentWordIndex);
  }
});

elements.nextBtn.addEventListener("click", () => {
  if (currentWordIndex < currentWords.length - 1) {
    currentWordIndex++;
    loadWord(currentWordIndex);
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" && currentWordIndex > 0) {
    currentWordIndex--;
    loadWord(currentWordIndex);
  }

  if (event.key === "ArrowRight" && currentWordIndex < currentWords.length - 1) {
    currentWordIndex++;
    loadWord(currentWordIndex);
  }

  if (event.key === " " || event.key === "Enter") {
    if (document.activeElement.tagName !== "BUTTON") {
      event.preventDefault();

      const wordData = currentWords[currentWordIndex];
      if (wordData && !elements.audioBtn.disabled) {
        speakWord(wordData.word);
      }
    }
  }
});