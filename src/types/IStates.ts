export type IStateArgs = 'pomodoro' | 'shortRest' | 'longRest';

export default interface IState {
  set state(state: IStateArgs);
  get state(): IStateArgs;
}
