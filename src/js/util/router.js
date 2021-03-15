import { isGameModeOff } from '../components/localStorage';
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

export function goToPage() {
  let isHashCorrect = false;
  cards[0].forEach((card) => {
    if (
      window.location.hash.slice(1)
      === card.toLocaleLowerCase().replaceAll(' ', '')
    ) {
      isHashCorrect = true;
    }
  });

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
    && (isGameModeOff.state === true || isGameModeOff.state === 'true')
  ) {
    goToRoute('train.html');
    fillCategoryHtmlPage();
  } else if (
    isHashCorrect
    && (isGameModeOff.state === false || isGameModeOff.state === 'false')
  ) {
    goToRoute('game.html');
    fillGameHtmlPage();
  } else if (!isHashCorrect) {
    goToRoute('404.html');
  }
}

export const onHashChange = window.addEventListener('hashchange', goToPage);
