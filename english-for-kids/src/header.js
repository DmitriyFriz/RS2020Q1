import { titleCards } from './assets/cards.js';

const titlePage = titleCards[0];
const isReloadingPage = (performance.navigation.type == 1);
const isTrainMode = JSON.parse(sessionStorage.getItem('isTrainMode'));

createHeader();

const checkboxMode = document.getElementById('checkbox');

checkboxMode.addEventListener('change', () => {
  sessionStorage.setItem('isTrainMode', checkboxMode.checked);
});

const menu = document.querySelector('.navigation');
const burgerButton = document.getElementById('burger-button');
const burgerOverlay = document.querySelector('.burger-overlay');
const headerNavigation = document.querySelector('.header-navigation');

burgerButton.addEventListener('click', changeStateBurgerMenu);
burgerOverlay.addEventListener('click', changeStateBurgerMenu);

menu.addEventListener('click', (event) => {
  const menuElement = event.target.closest('.navigation-item');
  if (!menuElement) return;
  sessionStorage.setItem('cardsGroup', menuElement.dataset.cardsGroup);
  menu.querySelectorAll('.navigation-item').forEach((item) => item.classList.remove('navigation-active'));
  menuElement.classList.add('navigation-active');
  changeStateBurgerMenu();
});

function changeStateBurgerMenu() {
  burgerButton.classList.toggle('burger-button-rotate');
  burgerOverlay.classList.toggle('visibility');
  headerNavigation.classList.toggle('visibility');
};

function createHeader() {
  const header = document.createElement('header');
  header.classList.add('header');

  const divHeader = document.createElement('div');
  divHeader.classList.add('wrapper', 'header-wrapper');

  const divBurger = document.createElement('div');
  divBurger.classList.add('burger-button');
  divBurger.setAttribute('id', 'burger-button');

  for (let i = 0; i < 3; i++) {
    const div = document.createElement('div');
    div.classList.add('burger-line');
    divBurger.append(div);
  }

  const divBurgerOverlay = document.createElement('div');
  divBurgerOverlay.classList.add('burger-overlay');

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', 'checkbox');
  if (isReloadingPage) {
    checkbox.checked = true;
    sessionStorage.removeItem('isTrainMode');
  } else {
    checkbox.checked = (isTrainMode == null) ? true : isTrainMode;
  }

  const label = document.createElement('label');
  label.setAttribute('for', 'checkbox');

  const nav = document.createElement('nav');
  nav.classList.add('header-navigation');

  const ul = document.createElement('ul');
  ul.classList.add('navigation');

  const liMainPage = document.createElement('li');
  liMainPage.classList.add('navigation-item');
  const aMainPage = document.createElement('a');
  aMainPage.setAttribute('href', 'index.html');
  aMainPage.textContent = 'Main Page';
  liMainPage.append(aMainPage);

  ul.append(liMainPage);

  titlePage.forEach((cardName, i) => {
    const li = document.createElement('li');
    li.classList.add('navigation-item');
    li.setAttribute('data-cards-group', i);
    const a = document.createElement('a');
    a.setAttribute('href', 'cards.html');
    a.textContent = cardName;
    li.append(a);
    ul.append(li);
  });

  nav.append(ul);

  divHeader.append(divBurger, divBurgerOverlay, checkbox, label, nav);

  header.append(divHeader);
  document.body.prepend(header);
};
