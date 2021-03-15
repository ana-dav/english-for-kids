import { gameMode } from '../constants/constants';

export const isGameModeOff = { state: true };

function setStudyMode() {
  gameMode.forEach((mode) => {
    mode.addEventListener('click', () => {
      isGameModeOff.state = mode.checked;
      localStorage.setItem('study-mode', isGameModeOff.state);
      window.location.reload();
    });
  });
}

export function getStudyMode() {
  const localStudyMode = localStorage.getItem('study-mode');
  isGameModeOff.state = localStudyMode !== null ? localStudyMode : false;
}

setStudyMode();
getStudyMode();
