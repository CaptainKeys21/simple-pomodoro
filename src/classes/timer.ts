import Itimer from '../types/Itimer';
import { secondsIntime } from '../utils/secondsIntime';

export default class timer implements Itimer {
  private _isRunning = false;
  private _time: number;
  private readonly _display;
  private intervaltimer: NodeJS.Timeout | any;

  constructor(time: number) {
    this._time = time;
    this._display = document.getElementById('timer') as HTMLSpanElement;
    this._display.innerText = secondsIntime(this._time);
  }

  public timerStart(): void {
    this._isRunning = true;
    this.intervaltimer = setInterval(() => {
      this._display.innerHTML = secondsIntime(this._time);
      this._time--;
      if (this._time < 0) {
        this.timerStop();
        document.dispatchEvent(new CustomEvent('onComplete'));
      }
    }, 1000);
  }

  public timerStop(): void {
    clearInterval(this.intervaltimer);
    this._isRunning = false;
  }

  set time(time: number) {
    this._display.innerHTML = secondsIntime(time);
    this._time = time;
  }

  get isRunning(): boolean {
    return this._isRunning;
  }
}
