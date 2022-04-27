import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import ISettings from '../types/ISettings';

export default class Settings implements ISettings {
  private static _instance: Settings;
  private static _filePath = resolve(__dirname, '..', 'settings.json');

  private _timePomo: number;
  private _timeShort: number;
  private _timeLong: number;

  private readonly _inputPomo: HTMLInputElement;
  private readonly _inputShort: HTMLInputElement;
  private readonly _inputLong: HTMLInputElement;

  private readonly btnConfigs: HTMLButtonElement;
  private readonly settingsDisplay: HTMLDivElement;
  private readonly _saveButton: HTMLInputElement;

  private constructor() {
    this._inputPomo = document.getElementById('cPomotime') as HTMLInputElement;
    this._inputShort = document.getElementById('cShorttime') as HTMLInputElement;
    this._inputLong = document.getElementById('cLongtime') as HTMLInputElement;

    this.btnConfigs = document.getElementById('btn-configs') as HTMLButtonElement;
    this._saveButton = document.getElementById('btn-SetBack') as HTMLInputElement;
    this.settingsDisplay = document.getElementById('settings') as HTMLDivElement;

    this._timePomo = 0;
    this._timeShort = 0;
    this._timeLong = 0;

    this.createFile();
    this.addEvents();
    this.loadData();

    this._inputPomo.value = String(this._timePomo);
    this._inputLong.value = String(this._timeLong);
    this._inputShort.value = String(this._timeShort);
  }
  get instance(): ISettings {
    throw new Error('Method not implemented.');
  }

  private loadData(): void {
    const data = JSON.parse(readFileSync(Settings._filePath, 'utf-8'));
    this._timePomo = data.timePomo;
    this._timeLong = data.timeLong;
    this._timeShort = data.timeShort;
  }

  private saveData(): void {
    const data = {
      timePomo: this._timePomo,
      timeShort: this._timeShort,
      timeLong: this._timeLong,
    };

    const jsonData = JSON.stringify(data);

    writeFileSync(Settings._filePath, jsonData, 'utf-8');
  }

  private createFile(): void {
    if (!existsSync(Settings._filePath)) {
      const data = {
        timePomo: this._timePomo,
        timeShort: this._timeShort,
        timeLong: this._timeLong,
      };

      const jsonData = JSON.stringify(data);
      writeFileSync(Settings._filePath, jsonData, 'utf-8');
    }
  }

  static get instance() {
    if (!Settings._instance) {
      Settings._instance = new Settings();
    }

    return Settings._instance;
  }

  private addEvents() {
    this.btnConfigs.addEventListener('click', () => {
      this.settingsDisplay.classList.remove('none');
    });

    this._saveButton.addEventListener('click', () => {
      this.saveSettings();
      this.settingsDisplay.classList.add('none');
      this.saveData();
      document.dispatchEvent(new CustomEvent('onUpdateSettings'));
    });
  }

  public saveSettings() {
    this._timePomo = Number(this._inputPomo.value);
    this._timeShort = Number(this._inputShort.value);
    this._timeLong = Number(this._inputLong.value);
  }

  get timePomo() {
    return this._timePomo;
  }

  set timePomo(time) {
    this._timePomo = time;
  }

  get timeShort() {
    return this._timeShort;
  }

  set timeShort(time) {
    this._timeShort = time;
  }

  get timeLong() {
    return this._timeLong;
  }

  set timeLong(time) {
    this._timeLong = time;
  }
}
