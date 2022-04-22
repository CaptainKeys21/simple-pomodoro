export default class Settings {
  private static _instance: Settings;
  private _timePomo: number;
  private _timeShort: number;
  private _timeLong: number;

  private constructor() {
    this._timePomo = 5;
    this._timeShort = 5;
    this._timeLong = 5;
  }

  static get instance(): Settings {
    if (!Settings._instance) {
      Settings._instance = new Settings();
    }

    return Settings._instance;
  }

  get timePomo(): number {
    return this._timePomo;
  }

  set timePomo(time: number) {
    this._timePomo = time;
  }

  get timeShort(): number {
    return this._timeShort;
  }

  set timeShort(time: number) {
    this._timeShort = time;
  }

  get timeLong(): number {
    return this._timeLong;
  }

  set timeLong(time: number) {
    this._timeLong = time;
  }
}
