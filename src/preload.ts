import frameWindow from './classes/frameWindow';
import Pomodoro from './classes/pomodoro';

window.addEventListener('DOMContentLoaded', () => {
  new Pomodoro();
  new frameWindow();
});
