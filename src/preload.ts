import { ipcRenderer } from 'electron';
import { Pomodoro } from './classes/pomodoro';

window.addEventListener('DOMContentLoaded', () => {
  const pomodoro = new Pomodoro();
  ipcRenderer.on('toggle-timer', () => {
    pomodoro.toggletimer();
  });

  ipcRenderer.on('toggle-pomo', (_event, value) => {
    pomodoro.changetimerState(value);
    pomodoro.changeStateHandler(value);
  });
  ipcRenderer.on('toggle-short', (_event, value) => {
    pomodoro.changetimerState(value);
    pomodoro.changeStateHandler(value);
  });
  ipcRenderer.on('toggle-long', (_event, value) => {
    pomodoro.changetimerState(value);
    pomodoro.changeStateHandler(value);
  });
});
