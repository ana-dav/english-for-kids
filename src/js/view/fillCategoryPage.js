import cards from '../data/cards';
import { imgPath, audioPath } from '../constants/constants';

function fillCategoryHtmlPage() {
  const pageName = document.querySelector('.page-name');
  const categoryCards = document.querySelectorAll('.cards');
  const categoryCardsFront = document.querySelectorAll('.front');
  const categoryCardsBack = document.querySelectorAll('.back');
  const categoryImgFront = document.querySelectorAll('#front-img');
  const categoryImgBack = document.querySelectorAll('#back-img');
  const categoryNameFront = document.querySelectorAll('#front-description');
  const categoryNameBack = document.querySelectorAll('#back-description');

  const pageNameLowerCases = window.location.hash.substr(1);
  const firstLetterToUpperCase = pageNameLowerCases.charAt(0).toUpperCase();
  const pageNameFirstUpperCase = firstLetterToUpperCase + pageNameLowerCases.substr(1);
  const pageNameText = pageNameFirstUpperCase.replace(/([^a-zA-Z_])/g, ' $1');

  pageName.innerText = pageNameText;

  const categoryIndex = cards[0].indexOf(pageNameText);

  categoryImgFront.forEach((imgFront, i) => {
    categoryNameFront[i].innerHTML = `<i id="turn" class="fa fa-refresh"></i>${
      cards[categoryIndex + 1][i].word
    }`;
    categoryNameBack[i].textContent = cards[categoryIndex + 1][i].translation;
    const imageName = cards[categoryIndex + 1][i].image;
    imgFront.style.backgroundColor = '#ffffff';
    imgFront.style.backgroundImage = `url("${imgPath}/${imageName}")`;
    categoryImgBack[i].style.backgroundColor = '#ffffff';
    categoryImgBack[i].style.backgroundImage = `url("${imgPath}/${imageName}")`;
  });

  const turnButton = document.querySelectorAll('.fa-refresh');

  turnButton.forEach((turn, i) => turn
    .addEventListener('click', () => {
      categoryCardsFront[i].style.transform = 'rotateY(180deg)';
      categoryCardsBack[i].style.transform = 'rotateY(0deg)';
    }));

  categoryCardsBack.forEach((card, i) => card
    .addEventListener('mouseleave', () => {
      categoryCardsFront[i].style.transform = 'rotateY(0deg)';
      categoryCardsBack[i].style.transform = 'rotateY(-180deg)';
    }));

  categoryCards.forEach((el, i) => el
    .addEventListener('click', () => {
      const audioName = cards[categoryIndex + 1][i].audioSrc;
      new Audio(`${audioPath}${audioName}`).play();
    }));
}

export default fillCategoryHtmlPage;
