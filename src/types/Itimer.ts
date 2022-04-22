export default interface Itimer {
  timerStart(): void;
  timerStop(): void;
  get isRunning(): boolean;
}
