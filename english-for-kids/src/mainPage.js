import { titleCards } from './assets/cards.js';

const titlePage = titleCards[0];
const imgForTitle = titleCards[1];
const header = document.querySelector('header');
const checkboxMode = document.getElementById('checkbox');

const main = document.createElement('main');
main.classList.add('wrapper', 'main-wrapper');

titlePage.forEach((cardName, i) => {
  const a = document.createElement('a');
  a.classList.add('main-card');
  if (!checkboxMode.checked) a.classList.add('main-card-play');
  a.setAttribute('data-cards-group', i);
  a.setAttribute('href', 'cards.html');
  const img = document.createElement('img');
  img.setAttribute('src', `src/assets/${imgForTitle[i]}`);
  img.setAttribute('alt', `${cardName}`);
  const p = document.createElement('p');
  p.textContent = cardName;
  a.append(img);
  a.append(p);
  main.append(a);
});

header.after(main);

const mainCards = document.querySelectorAll('.main-card');

checkboxMode.addEventListener('change', () => {
  mainCards.forEach((card) => {
    card.classList.toggle('main-card-play');
  });
});

main.addEventListener('click', (event) => {
  const mainCard = event.target.closest('.main-card');
  if (!mainCard) return;
  sessionStorage.setItem('cardsGroup', mainCard.dataset.cardsGroup);
});
