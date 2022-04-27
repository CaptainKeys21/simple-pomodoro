export default interface ISettings {
  get instance(): ISettings;
  saveSettings(): void;
  get timePomo(): number;
  set timePomo(time: number);
  get timeShort(): number;
  set timeShort(time: number);
  get timeLong(): number;
  set timeLong(time: number);
}
