import { IStateArgs } from '../types/states';

export function upperBtnController(state: IStateArgs): void {
  const btnPomo = document.getElementById('btn-pomo') as HTMLSpanElement;
  const btnShort = document.getElementById('btn-short') as HTMLSpanElement;
  const btnLong = document.getElementById('btn-long') as HTMLSpanElement;

  switch (state) {
    case 'pomodoro': {
      btnShort.classList.remove('selected');
      btnLong.classList.remove('selected');
      btnPomo.classList.add('selected');
      break;
    }
    case 'shortRest': {
      btnLong.classList.remove('selected');
      btnPomo.classList.remove('selected');
      btnShort.classList.add('selected');
      break;
    }
    case 'longRest': {
      btnShort.classList.remove('selected');
      btnPomo.classList.remove('selected');
      btnLong.classList.add('selected');
      break;
    }
  }
}
