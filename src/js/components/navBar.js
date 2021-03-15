import cards from '../data/cards';
import { navCategory } from '../constants/constants';

function fillNavHtml() {
  navCategory.forEach((cat, index) => {
    if (index !== 0) cat.innerText = cards[0][index - 1];
  });

  navCategory[0].innerText = 'Main page';
}

export default fillNavHtml;

const toggleButton = document.querySelector('#nav__toggle');
const navigation = document.querySelector('.nav');
const navList = document.querySelector('.nav__list');
const navDecorators = document.querySelectorAll('.menu-line');

function changeBgColor() {
  const colors = { blue: 'blue', red: 'red', purple: '#3234a8' };
  navDecorators.forEach((navDec, i) => {
    if (i % 3 === 0) {
      navDec.style.backgroundColor = colors.blue;
    } else if (i % 3 === 1) {
      navDec.style.backgroundColor = colors.purple;
    } else {
      navDec.style.backgroundColor = colors.red;
    }
  });
}

toggleButton.addEventListener('click', () => {
  if (toggleButton.checked) {
    navDecorators.forEach(
      (span) => {
        span.style.backgroundColor = 'whitesmoke';
      },
    );
    navList.style.left = '0';
    window.addEventListener('click', (e) => {
      if (!navigation.contains(e.target)) {
        toggleButton.checked = false;
        changeBgColor();
        navList.style.left = '-100%';
      }
    });
  } else {
    changeBgColor();
    navList.style.left = '-100%';
  }
});
