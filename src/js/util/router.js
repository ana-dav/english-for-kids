import { gameMode, checkbox } from '../constants/constants';
import cards from '../data/cards';
import fillMainPage from '../view/fillMainPage';
import fillCategoryHtmlPage from '../view/fillCategoryPage';
import fillGameHtmlPage from '../view/fillGamePage';

const rootElem = document.querySelector('#app');

function goToRoute(pageName) {
  const url = `views/${pageName}`;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      rootElem.innerHTML = xhttp.responseText;
    }
  };
  xhttp.open('GET', url, false);
  xhttp.send();
}

function goToPage() {
  let isHashCorrect = false;
  cards[0].forEach((card) => {
    if (
      window.location.hash.slice(1)
      === card.toLocaleLowerCase().replaceAll(' ', '')
    ) {
      isHashCorrect = true;
    }
  });

  let isGameModeOff = true;
  gameMode.addEventListener('click', function setLocalStorage() {
    isGameModeOff = !checkbox.checked;
    localStorage.setItem('study-mode', isGameModeOff);
    goToPage();
    gameMode.removeEventListener('click', setLocalStorage);
  });

  isGameModeOff = localStorage.getItem('study-mode');

  const hashLocation = window.location.hash;
  if (hashLocation.length === 0 || hashLocation === '' || hashLocation === '#main') {
    goToRoute('main.html');
    fillMainPage();
    const categoryCards = document.querySelectorAll('.cards');

    categoryCards.forEach((card) => {
      card.addEventListener('click', () => {
        goToRoute('train.html');
        const description = card.querySelector('.cards__description');
        window.location.hash = description.innerHTML.toLowerCase().replaceAll(' ', '');
        fillCategoryHtmlPage();
      });
    });
  } else if (
    isHashCorrect
    && (isGameModeOff === true || isGameModeOff === 'true')
  ) {
    goToRoute('train.html');
    fillCategoryHtmlPage();
  } else if (
    isHashCorrect
    && (isGameModeOff === false || isGameModeOff === 'false')
  ) {
    goToRoute('game.html');
    fillGameHtmlPage();
  } else if (!isHashCorrect) {
    goToRoute('404.html');
  }
}

window.addEventListener('hashchange', goToPage);

export default goToPage;
