const emojis = ["🌸", "💜", "🌷", "🦋", "⭐", "🌼", "🍇", "🌻", "🎀"];
let cartas = [...emojis, ...emojis];
let primeira = null;
let segunda = null;
let bloqueio = false;

// Contadores
let movimentos = 0;
let paresCertos = 0;

// Atualiza painel
function atualizarPainel() {
  document.getElementById("movimentos").textContent = movimentos;
  document.getElementById("pares").textContent = paresCertos;
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function criarTabuleiro() {
  const tabuleiro = document.getElementById("tabuleiro");
  tabuleiro.innerHTML = "";
  embaralhar(cartas).forEach(emoji => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.innerHTML = `
      <div class="face verso"></div>
      <div class="face frente">${emoji}</div>
    `;
    carta.addEventListener("click", () => virarCarta(carta, emoji));
    tabuleiro.appendChild(carta);
  });
}

function virarCarta(carta, emoji) {
  if (bloqueio || carta.classList.contains("virada")) return;

  carta.classList.add("virada");

  if (!primeira) {
    primeira = { carta, emoji };
  } else {
    segunda = { carta, emoji };
    movimentos++;
    atualizarPainel();
    verificarPar();
  }
}

function verificarPar() {
  if (!primeira || !segunda) return;

  bloqueio = true;

  if (primeira.emoji === segunda.emoji) {
    paresCertos++;
    atualizarPainel();
    primeira = null;
    segunda = null;
    bloqueio = false;
    verificarVitoria();
  } else {
    setTimeout(() => {
      primeira.carta.classList.remove("virada");
      segunda.carta.classList.remove("virada");
      primeira = null;
      segunda = null;
      bloqueio = false;
    }, 800);
  }
}

function verificarVitoria() {
  if (paresCertos === emojis.length) {
    setTimeout(() => {
      alert(`🎉 Parabéns! Você venceu com ${movimentos} movimentos!`);
    }, 300);
  }
}

function reiniciar() {
  primeira = null;
  segunda = null;
  bloqueio = false;
  movimentos = 0;
  paresCertos = 0;
  atualizarPainel();
  cartas = [...emojis, ...emojis];
  criarTabuleiro();
}

criarTabuleiro();
atualizarPainel();
