import { ipcRenderer } from 'electron';

export default class frameWindow {
  private readonly btnClose: HTMLButtonElement;
  private readonly btnMinimize: HTMLButtonElement;

  constructor() {
    this.btnClose = document.getElementById('btnClose') as HTMLButtonElement;
    this.btnMinimize = document.getElementById('btnMinimize') as HTMLButtonElement;
    this.addEvents();
  }

  private addEvents(): void {
    this.btnClose.addEventListener('click', () => {
      ipcRenderer.send('btnClose');
    });

    this.btnMinimize.addEventListener('click', () => {
      ipcRenderer.send('btnMinimize');
    });
  }
}
