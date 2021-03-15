import cards from '../data/cards';
import { audioPath } from '../constants/constants';
import showPopUp from './popUp';
import addStar from './star';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
export default class Game {
  constructor(category) {
    this.category = category;
    this.audios = [];
    this.errorsCount = 0;
    this.count = 0;
    this.init();
  }

  init() {
    const categoryIndex = cards[0].indexOf(this.category) + 1;
    this.setQuestionsAmount(cards[categoryIndex].length);
    cards[categoryIndex].forEach((card) => this.audios.push(card.audioSrc));

    shuffleArray(this.audios);
    this.setQuestion(this.count);
    this.changeButton();
  }

  setQuestionsAmount(amount) {
    this.amount = amount;
  }

  setQuestion(questionCount) {
    this.question = this.audios[questionCount];
    this.audio = new Audio(`${audioPath}${this.question}`);
    setTimeout(() => {
      this.audio.play();
    }, 1000);
    this.getAnswer();
  }

  changeButton() {
    const repeatButton = document.querySelector('.repeat');
    const game = this;
    function repeatQuestion() {
      this.audio.play();
      repeatButton.removeEventListener('click', repeatQuestion.bind(game));
    }
    repeatButton.addEventListener('click', repeatQuestion.bind(game));
  }

  getAnswer() {
    const cardsWrapper = document.querySelector('.cards__wrapper');

    function check(card) {
      if (card.target.className !== 'cards__img-full') return;
      this.answer = card.target.style.backgroundImage
        .slice(25, -1)
        .replace(/"/g, '');
      const game = this;

      const checkAnswer = () => {
        if (this.answer.slice(0, -4) === this.question.slice(0, -4)) {
          this.isCorrect = true;
          this.count += 1;
          cardsWrapper.removeEventListener('click', checkGame);
          card.target.className = 'cards__img-full not-active';
        } else {
          this.isCorrect = false;
          this.errorsCount += 1;
        }
        this.addStar();
      };
      checkAnswer.bind(game)();
    }

    const checkGame = check.bind(this);
    cardsWrapper.addEventListener('click', checkGame);
  }

  addStar() {
    addStar(this.isCorrect);
    if (this.isCorrect) this.continueGame();
  }

  continueGame() {
    const questionsAmount = this.amount;
    if (this.count < questionsAmount) {
      this.setQuestion(this.count);
    } else {
      this.showPopUp();
    }
  }

  showPopUp() {
    showPopUp(this.errorsCount);
  }
}
