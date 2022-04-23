import Settings from './settings';
import State from './state';
import timer from './timer';

export class Pomodoro {
  private readonly _timer: timer;
  private readonly btnMain: HTMLButtonElement;
  private readonly settings: Settings;
  private readonly _state: State;
  private pomoCount = 0;
  private shortCount = 0;
  private longCount = 0;
  constructor() {
    this.settings = Settings.instance;
    this._timer = new timer(this.settings.timePomo);
    this._state = new State();
    this.btnMain = document.getElementById('btn-main-toggle') as HTMLButtonElement;
    this.addEvents();
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

  private toggletimer(): void {
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

  private changetimerState(state: string) {
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
        this._timer.timerStart();
      } else {
        this._state.state = 'shortRest';
        this.changetimerState(this._state.state);
        this._timer.timerStart();
      }
    } else {
      this._state.state === 'longRest' ? this.longCount++ : this.shortCount++;
      this._state.state = 'pomodoro';
      this.changetimerState(this._state.state);
      this._timer.timerStart();
    }
  }
}
