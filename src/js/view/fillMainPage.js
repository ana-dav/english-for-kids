import cards from '../data/cards';
import { imgPath } from '../constants/constants';

const fillMainHtmlPage = () => {
  const pageName = document.querySelector('.page-name');
  const cardsWrapper = document.querySelector('.cards__wrapper');

  pageName.innerText = 'Main page';

  cards[0].forEach((card) => {
    const cardDiv = document.createElement('div');
    const cardImgDiv = document.createElement('div');
    const cardDescrDiv = document.createElement('div');

    cardDiv.className = 'cards';
    cardImgDiv.className = 'cards__img';
    cardDescrDiv.className = 'cards__description';

    cardDescrDiv.textContent = card;
    const imageName = card.toString().toLocaleLowerCase().replace(' ', '');

    cardImgDiv.style.backgroundImage = `url("${imgPath}/${imageName}.jpg")`;

    cardsWrapper.appendChild(cardDiv);
    cardDiv.appendChild(cardImgDiv);
    cardDiv.appendChild(cardDescrDiv);
  });
};

export default fillMainHtmlPage;
