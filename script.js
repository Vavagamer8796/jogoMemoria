// script.js — Jogo da Memória (18 cartas / 9 pares)

const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const pairsEl = document.getElementById('pairs');
const restartBtn = document.getElementById('restart');

const TOTAL_PAIRS = 9;
let symbols = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

// Gera 9 símbolos únicos (usando emojis)
function generateSymbols() {
  const base = ['🍇','🍉','🍊','🍓','🍒','🥝','🍍','🥥','🍋'];
  return base.slice(0, TOTAL_PAIRS);
}

// Embaralha o array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Cria o tabuleiro com as 18 cartas
function createBoard() {
  board.innerHTML = '';
  symbols = generateSymbols();
  const deck = shuffle([...symbols, ...symbols]); // duplica e embaralha

  deck.forEach(sym => {
    const card = document.createElement('button');
    card.className = 'card';
    card.dataset.symbol = sym;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back">?</div>
        <div class="card-face card-front">${sym}</div>
      </div>
    `;
    card.addEventListener('click', onCardClick);
    board.appendChild(card);
  });

  // reseta variáveis
  moves = 0;
  matchedPairs = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  updateStats();
}

// Lógica ao clicar em uma carta
function onCardClick(e) {
  const card = e.currentTarget;
  if (lockBoard) return;
  if (card === firstCard) return;
  if (card.classList.contains('matched')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves++;
  updateStats();

  checkForMatch();
}

// Verifica se formou um par
function checkForMatch() {
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;

    resetTurn();

    if (matchedPairs === TOTAL_PAIRS) {
      setTimeout(() => {
        alert(`🎉 Parabéns! Você encontrou todos os pares em ${moves} movimentos.`);
      }, 300);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 800);
  }
}

// Reseta a jogada
function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
  updateStats();
}

// Atualiza o placar
function updateStats() {
  movesEl.textContent = moves;
  pairsEl.textContent = matchedPairs;
}

// Reiniciar o jogo
restartBtn.addEventListener('click', createBoard);

// Inicia o jogo ao carregar
createBoard();
