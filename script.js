// STAP 1: De import (De belangrijkste regel!)
import { INITIAL_VOCABULARY } from './vocabulary.js';

// Variabelen voor de app-status
let filteredList = [...INITIAL_VOCABULARY];
let currentWord = null;

// STAP 2: Vul het dropdown-menu automatisch met categorieën uit de lijst
const categorySelect = document.getElementById('category-select');
const uniqueCategories = [...new Set(INITIAL_VOCABULARY.map(item => item.categorie))];

uniqueCategories.sort().forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
});

// STAP 3: Functie om een nieuwe kaart te trekken
function nextCard() {
    // Pak een willekeurig woord uit de (gefilterde) lijst
    const randomIndex = Math.floor(Math.random() * filteredList.length);
    currentWord = filteredList[randomIndex];

    // Reset de kaart (draai terug naar voorkant)
    document.getElementById('card').classList.remove('is-flipped');

    // Vul de tekst in de HTML-elementen
    document.getElementById('jp-word').textContent = currentWord.jp;
    document.getElementById('word-type').textContent = `${currentWord.taal.toUpperCase()} | ${currentWord.categorie}`;
    document.getElementById('nl-meaning').textContent = currentWord.nl;
    document.getElementById('romaji-text').textContent = currentWord.romaji;
}

// STAP 4: Event Listeners (De knoppen laten werken)

// Kaart omdraaien bij klik
document.getElementById('card').addEventListener('click', () => {
    document.getElementById('card').classList.toggle('is-flipped');
});

// Volgende kaart bij 'Nog niet' of 'Ken ik!'
document.querySelector('.btn-red').addEventListener('click', nextCard);
document.querySelector('.btn-green').addEventListener('click', nextCard);

// Filteren wanneer de gebruiker een andere categorie kiest
categorySelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected === 'alle') {
        filteredList = [...INITIAL_VOCABULARY];
    } else {
        filteredList = INITIAL_VOCABULARY.filter(item => item.categorie === selected);
    }
    nextCard(); 
});

// Start de app direct met het eerste woord
nextCard();
