import { cards } from './assets/cards.js';

let numberCardsGroup = JSON.parse(sessionStorage.getItem('cardsGroup'));
numberCardsGroup = (numberCardsGroup == null) ? 0 : numberCardsGroup;
const currentCardsGroup = cards[numberCardsGroup];

const audioForGame = [];
let indexForGame = 0;
let errorsForGame = 0;
const resultAudio = { correct: 'audio/correct.mp3', error: 'audio/error.mp3' };
const finishGameAudio = { success: 'audio/success.mp3', failure: 'audio/failure.mp3' };

const header = document.querySelector('header');
const checkboxMode = document.getElementById('checkbox');

const main = document.createElement('main');
main.classList.add('wrapper', 'main-wrapper');

const divLine = document.createElement('div');
divLine.classList.add('star-line');
main.append(divLine);

currentCardsGroup.forEach((card) => {
  const divContainer = document.createElement('div');
  divContainer.classList.add('card-container');
  const divFlipper = document.createElement('div');
  divFlipper.classList.add('flipper');
  if (!checkboxMode.checked) divFlipper.classList.add('flipper-play');

  const divFront = document.createElement('div');
  divFront.classList.add('front');
  divFront.setAttribute('style', `background-image: url('src/assets/${card.image}')`);
  const paragraphFront = document.createElement('p');
  paragraphFront.classList.add('card-caption');
  paragraphFront.textContent = `${card.word}`;
  divFront.append(paragraphFront);

  const divBack = document.createElement('div');
  divBack.classList.add('back');
  divBack.setAttribute('style', `background-image: url('src/assets/${card.image}')`);
  const paragraphBack = document.createElement('p');
  paragraphBack.classList.add('card-caption');
  paragraphBack.textContent = `${card.translation}`;
  divBack.append(paragraphBack);

  const divRotate = document.createElement('div');
  divRotate.classList.add('rotate');

  divFlipper.append(divFront, divBack, divRotate);
  divContainer.append(divFlipper);

  if (!checkboxMode.checked) {
    paragraphFront.classList.add('hidden');
    paragraphBack.classList.add('hidden');
    divRotate.classList.add('hidden');
  }

  main.append(divContainer);

  audioForGame.push(card.audioSrc);
});

header.after(main);

const buttonPlay = document.createElement('button');
buttonPlay.classList.add('button-play');
if (checkboxMode.checked) buttonPlay.classList.add('hidden');
buttonPlay.textContent = 'Start Game';

main.after(buttonPlay);

const cardCaptions = document.querySelectorAll('.card-caption');
const translateButtons = document.querySelectorAll('.rotate');
const flippers = document.querySelectorAll('.flipper');
const cardContainers = document.querySelectorAll('.card-container');

checkboxMode.addEventListener('change', () => {
  for (let i = 0; i < flippers.length; i++) {
    flippers[i].classList.toggle('flipper-play');
    translateButtons[i].classList.toggle('hidden');
  }
  cardCaptions.forEach((item) => {
    item.classList.toggle('hidden');
  });
  buttonPlay.classList.toggle('hidden');
  buttonPlay.classList.remove('repeat');
  buttonPlay.removeEventListener('click', repeatAudio);
});

// TRAIN MODE
main.addEventListener('click', (event) => {
  if (!event.target.classList.contains('rotate')) return;
  const cardsFlipper = event.target.closest('.flipper');
  const currentCardContainer = event.target.closest('.card-container');
  cardsFlipper.classList.add('translate-card');

  main.addEventListener('mouseover', function backFlip(event) {
    if (event.target.closest('.card-container') == currentCardContainer) return;
    cardsFlipper.classList.remove('translate-card');
    main.removeEventListener('mouseover', backFlip);
  });
});

main.addEventListener('click', (event) => {
  if (!checkboxMode.checked) return;
  if (event.target.classList.contains('rotate')) return;
  const currentCardContainer = event.target.closest('.card-container');
  if (!currentCardContainer) return;
  if (event.target.closest('.translate-card')) return;
  const pronunciationAudio = getSrcAudio(currentCardContainer);
  playWord(pronunciationAudio);
});

// PLAY MODE
buttonPlay.addEventListener('click', () => {
  if (buttonPlay.classList.contains('repeat')) return;
  indexForGame = 0;
  errorsForGame = 0;
  buttonPlay.classList.add('repeat');
  shuffle(audioForGame);
  const startAudio = audioForGame[indexForGame];
  setTimeout(playWord, 600, startAudio);
  buttonPlay.addEventListener('click', repeatAudio);
});

main.addEventListener('click', (event) => {
  if (checkboxMode.checked) return;
  if (!buttonPlay.classList.contains('repeat')) return;
  const selectedCard = event.target.closest('.card-container');
  if (!selectedCard || selectedCard.classList.contains('completed-card')) return;
  const rightAudio = audioForGame[indexForGame];
  const selectedAudio = getSrcAudio(selectedCard);
  if (selectedAudio == rightAudio) {
    selectedCard.classList.add('completed-card');
    setTimeout(playWord, 100, resultAudio.correct);
    addStar('correct');
    ++indexForGame;
    if (indexForGame == audioForGame.length) {
      finishGame();
      return;
    }
    const nextAudio = audioForGame[indexForGame];
    setTimeout(playWord, 1000, nextAudio);
  } else {
    setTimeout(playWord, 100, resultAudio.error);
    addStar('error');
    errorsForGame++;
  }
});

function repeatAudio() {
  if (checkboxMode.checked) return;
  if (!buttonPlay.classList.contains('repeat')) return;
  const repeatedAudio = audioForGame[indexForGame];
  playWord(repeatedAudio);
}


function addStar(result) {
  const divStar = document.createElement('div');
  divStar.classList.add(`star-${result}`);
  divLine.append(divStar);
}

function finishGame() {
  const finishAudio = errorsForGame ? finishGameAudio.failure : finishGameAudio.success;
  setTimeout(playWord, 100, finishAudio);
  setTimeout(changeLocation, 3000);
}

function changeLocation() {
  document.location.href = 'index.html';
}


function getSrcAudio(currentCardContainer) {
  let containerIndex = null;
  cardContainers.forEach((card, index) => {
    if (card == currentCardContainer) containerIndex = index;
  });
  const src = currentCardsGroup[containerIndex].audioSrc;
  return src;
}

function playWord(src) {
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = `src/assets/${src}`;
  audio.play();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
