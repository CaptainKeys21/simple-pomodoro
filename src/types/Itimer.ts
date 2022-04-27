export default interface Itimer {
  timerStart(): void;
  timerStop(): void;
  set time(time: number);
  get isRunning(): boolean;
}
