import { audioPath, imgPath } from '../constants/constants';

const showPopUp = (errors) => {
  const popUp = document.querySelector('.custom-modal');
  const popUpText = document.querySelector('.custom-modal-head-text');
  const popUpImg = document.querySelector('.custom-modal-main-image');

  popUp.style.display = 'block';
  if (errors === 0) {
    new Audio(`${audioPath}success.mp3`).play();
    popUpText.innerHTML = 'You win!!!';
    popUpImg.src = `${imgPath}/success.jpg`;
  } else {
    new Audio(`${audioPath}failure.mp3`).play();
    popUpText.innerHTML = `Oh, noo( Errors: ${errors}`;
    popUpImg.src = `${imgPath}/failure.jpg`;
  }

  function deactivateModal() {
    setTimeout(() => {
      popUp.style.display = 'none';
    }, 4000);
  }
  deactivateModal();

  function showMainPage() {
    setTimeout(() => {
      window.location.hash = '#main';
    }, 4010);
  }
  showMainPage();
};

export default showPopUp;
