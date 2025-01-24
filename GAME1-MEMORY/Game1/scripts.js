const cards = document.querySelectorAll('.memory-card');
const totalPairs = cards.length / 2; // Número total de pares
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0; // Contador de pares encontrados
const continueButton = document.getElementById('continue-btn');

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // Primer clic
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // Segundo clic
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matchedPairs++; // Incrementa el contador de pares encontrados
  checkWin(); // Comprueba si se ha ganado

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function checkWin() {
  if (matchedPairs === totalPairs) {
    setTimeout(() => {
      alert('¡Felicidades, has ganado!');
      continueButton.style.display = 'block'; // Hace visible el botón
    }, 500);
  }
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
