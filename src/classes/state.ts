import IState, { IStateArgs } from '../types/IStates';

interface IUpperButtons {
  btnPomo: HTMLSpanElement;
  btnLong: HTMLSpanElement;
  btnShort: HTMLSpanElement;
}

export default class State implements IState {
  private _state: IStateArgs = 'pomodoro';
  private readonly _body: HTMLBodyElement;
  private readonly upperButtons: IUpperButtons;

  constructor() {
    this._body = document.getElementsByClassName('body')[0] as HTMLBodyElement;
    this.upperButtons = {
      btnPomo: document.getElementById('btn-pomo') as HTMLSpanElement,
      btnLong: document.getElementById('btn-long') as HTMLSpanElement,
      btnShort: document.getElementById('btn-short') as HTMLSpanElement,
    };
    this.addEvents();
  }

  private addEvents() {
    this.upperButtons.btnPomo.addEventListener('click', () => (this.state = 'pomodoro'));
    this.upperButtons.btnLong.addEventListener('click', () => (this.state = 'longRest'));
    this.upperButtons.btnShort.addEventListener('click', () => (this.state = 'shortRest'));
  }

  private changeButtonSelected(state: IStateArgs) {
    let btn: keyof IUpperButtons;
    for (btn in this.upperButtons) {
      this.upperButtons[btn].classList.remove('selected');
      if (this.upperButtons[btn].classList.contains(state)) this.upperButtons[btn].classList.add('selected');
    }
  }

  set state(state) {
    this._state = state;
    this.changeButtonSelected(state);
    this._body.id = this._state;
    document.dispatchEvent(new CustomEvent<string>('onStateChange', { detail: this._state }));
  }

  get state() {
    return this._state;
  }
}
