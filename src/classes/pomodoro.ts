import ISettings from '../types/ISettings';
import Settings from './settings';

import IState, { IStateArgs } from '../types/IStates';
import State from './state';

import Itimer from '../types/Itimer';
import timer from './timer';

import IPomodoro from '../types/IPomodoro';
import { ipcRenderer } from 'electron';

export default class Pomodoro implements IPomodoro {
  private readonly _timer: Itimer;
  private readonly btnMain: HTMLButtonElement;
  private readonly settings: ISettings;
  private readonly _state: IState;
  private pomoCount = 0;
  private shortCount = 0;
  private longCount = 0;
  constructor() {
    this.settings = Settings.instance;
    this._timer = new timer(this.settings.timePomo);
    this._state = new State();
    this.btnMain = document.getElementById('btn-main-toggle') as HTMLButtonElement;
    this.addEvents();
    this.addIpcRender();
  }

  private addEvents(): void {
    document.addEventListener('onComplete', () => {
      this.next();
    });

    document.addEventListener('onUpdateSettings', () => {
      this.changetimerState(this._state.state);
    });

    document.addEventListener('onStateChange', (e) => {
      this.changetimerState((<CustomEvent>e).detail);
    });

    this.btnMain.addEventListener('click', () => {
      this.toggletimer();
    });
  }

  private addIpcRender(): void {
    ipcRenderer.on('toggle-timer', () => {
      this.toggletimer();
    });
    ipcRenderer.on('toggle-pomo', (_event, value) => {
      this.changetimerState(value);
      this.changeStateHandler(value);
    });
    ipcRenderer.on('toggle-short', (_event, value) => {
      this.changetimerState(value);
      this.changeStateHandler(value);
    });
    ipcRenderer.on('toggle-long', (_event, value) => {
      this.changetimerState(value);
      this.changeStateHandler(value);
    });
  }

  public toggletimer(): void {
    if (this._timer.isRunning) {
      this.btnMain.innerText = 'Continuar';
      this._timer.timerStop();
      console.log(this._timer.isRunning);
    } else {
      this.btnMain.innerHTML = 'Pausar';
      this._timer.timerStart();
      console.log(this._timer.isRunning);
    }
  }

  public changetimerState(state: IStateArgs) {
    switch (state) {
      case 'pomodoro': {
        this._timer.time = this.settings.timePomo;
        break;
      }

      case 'shortRest': {
        this._timer.time = this.settings.timeShort;
        break;
      }

      case 'longRest': {
        this._timer.time = this.settings.timeLong;
        break;
      }

      default:
        break;
    }
  }

  private next(): void {
    if (this._state.state === 'pomodoro') {
      this.pomoCount++;
      if (this.pomoCount % 4 === 0) {
        this._state.state = 'longRest';
        this.changetimerState(this._state.state);
        ipcRenderer.send('changeLong');
        this._timer.timerStart();
      } else {
        this._state.state = 'shortRest';
        this.changetimerState(this._state.state);
        ipcRenderer.send('changeShort');
        this._timer.timerStart();
      }
    } else {
      this._state.state === 'longRest' ? this.longCount++ : this.shortCount++;
      this._state.state = 'pomodoro';
      this.changetimerState(this._state.state);
      ipcRenderer.send('changePomo');
      this._timer.timerStart();
    }
  }

  public changeStateHandler(string: IStateArgs): void {
    this._state.state = string;
  }
}
