import cards from '../data/cards';
import { imgPath } from '../constants/constants';
import Game from '../components/Game';

const fillGameHtmlPage = () => {
  const pageName = document.querySelector('.page-name');
  const gameStartButton = document.querySelector('.game__start');
  const cardsWrapper = document.querySelector('.cards__wrapper');

  const pageNameLowerCases = window.location.hash.substr(1);
  const firstLetterToUpperCase = pageNameLowerCases.charAt(0).toUpperCase();
  const pageNameFirstUpperCase = firstLetterToUpperCase + pageNameLowerCases.substr(1);
  const pageNameText = pageNameFirstUpperCase.replace(/([^a-zA-Z_])/g, ' $1');

  pageName.innerText = pageNameText;

  cards[0].forEach(() => {
    const cardsDiv = document.createElement('div');
    const gameImg = document.createElement('div');

    cardsDiv.className = 'cards';
    gameImg.className = 'cards__img-full';

    cardsWrapper.appendChild(cardsDiv);
    cardsDiv.appendChild(gameImg);
  });

  const gameImg = document.querySelectorAll('.cards__img-full');

  const categoryIndex = cards[0].indexOf(pageNameText);

  gameImg.forEach((img, i) => {
    const imageName = cards[categoryIndex + 1][i].image;
    img.style.backgroundImage = `url("${imgPath}/${imageName}")`;
  });

  const createGame = () => {
    gameStartButton.className = 'repeat border';
    gameStartButton.innerHTML = '<i class="fa fa-refresh"></i>';
    new Game(pageNameText);
    gameStartButton.removeEventListener('click', createGame);
  };

  gameStartButton.addEventListener('click', createGame);
};

export default fillGameHtmlPage;
