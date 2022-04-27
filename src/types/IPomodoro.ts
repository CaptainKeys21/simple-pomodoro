import { IStateArgs } from './IStates';

export default interface IPomodoro {
  toggletimer(): void;
  changetimerState(state: IStateArgs): void;
  changeStateHandler(state: IStateArgs): void;
}
