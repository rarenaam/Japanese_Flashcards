// Jouw data (ingekort voorbeeld)
const vocabulary = [ /* Plak hier je hele array van 500 woorden */ ];

let currentList = [...vocabulary];
let currentIndex = 0;

const card = document.querySelector('.card');
card.addEventListener('click', () => card.classList.toggle('is-flipped'));

function displayWord() {
  const word = currentList[currentIndex];
  document.getElementById('jp-word').innerText = word.jp;
  document.getElementById('word-type').innerText = word.categorie;
  document.getElementById('nl-meaning').innerText = word.nl;
  document.getElementById('romaji-text').innerText = word.romaji;
  card.classList.remove('is-flipped');
}

function nextCard(known) {
  // Optioneel: sla 'known' op om een score bij te houden
  currentIndex = Math.floor(Math.random() * currentList.length);
  displayWord();
}

// Filteren op categorie
document.getElementById('category-select').addEventListener('change', (e) => {
  const cat = e.target.value;
  currentList = cat === 'alle' ? vocabulary : vocabulary.filter(w => w.categorie === cat);
  currentIndex = 0;
  displayWord();
});

// Start het spel
displayWord();
