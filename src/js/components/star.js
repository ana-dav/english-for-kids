import { audioPath } from '../constants/constants';

const addStar = (isAnswerCorrect) => {
  const starWrapper = document.querySelector('.stars__wrapper');
  const starDiv = document.createElement('div');
  starDiv.className = 'star';

  if (isAnswerCorrect) {
    new Audio(`${audioPath}correct.mp3`).play();
    starDiv.style.backgroundImage = 'url("../../assets/images/star-win.svg")';
    starWrapper.appendChild(starDiv);
  } else if (!isAnswerCorrect) {
    new Audio(`${audioPath}error.mp3`).play();
    starDiv.style.backgroundImage = 'url("../../assets/images/star.svg")';
    starWrapper.appendChild(starDiv);
  }
};

export default addStar;
