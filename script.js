// Variables y referencias
let randomNumber   = Math.floor(Math.random() * 100) + 1;
const guesses      = document.querySelector('.guesses');
const lastResult   = document.querySelector('#lastResult');
const lowOrHi      = document.querySelector('.lowOrHi');
const guessSubmit  = document.querySelector('.guessSubmit');
const guessField   = document.querySelector('.guessField');

let guessCount     = 1;
let resetButton;

// Enfoca automáticamente el campo de texto al cargar
guessField.focus();

// Función principal: comprueba el intento
function checkGuess() {
  const userGuess = Number(guessField.value);

  if (guessCount === 1) {
    guesses.textContent = 'Intentos anteriores: ';
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = '¡Felicidades! ¡Lo adivinaste!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '¡¡¡Fin del juego!!!';
    lowOrHi.textContent = '';
    setGameOver();
  } else {
    lastResult.textContent = '¡Incorrecto!';
    lastResult.style.backgroundColor = 'red';
    lowOrHi.textContent = userGuess < randomNumber
      ? '¡El número es muy bajo!'
      : '¡El número es muy grande!';
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

// Escucha el clic del botón “Enviar respuesta”
guessSubmit.addEventListener('click', checkGuess);

// Finaliza y permitite reiniciar el juego
function setGameOver() {
  guessField.disabled   = true;
  guessSubmit.disabled  = true;

  resetButton           = document.createElement('button');
  resetButton.textContent = 'Iniciar nuevo juego';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

// Reiniciar todo para un nuevo juego
function resetGame() {
  guessCount = 1;

  // Limpia párrafos de resultados
  const resetParas = document.querySelectorAll('.resultParas p');
  resetParas.forEach(p => p.textContent = '');

  // Elimina el botón de reinicio
  resetButton.parentNode.removeChild(resetButton);

  // Reactiva controles e interfaz
  guessField.disabled  = false;
  guessSubmit.disabled = false;
  guessField.value     = '';
  guessField.focus();
  lastResult.style.backgroundColor = 'white';

  // Nuevo número aleatorio
  randomNumber = Math.floor(Math.random() * 100) + 1;
}