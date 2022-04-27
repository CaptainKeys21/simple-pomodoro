import { app, BrowserWindow, ipcMain, Menu, nativeImage, Tray } from 'electron';
import path from 'path';

const createWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    width: 450,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
    frame: false,
    resizable: false,
    skipTaskbar: false,
  });

  mainWindow.loadFile(path.resolve(__dirname, 'index.html'));

  return mainWindow;
};

app.whenReady().then(() => {
  const mainWindow = createWindow();

  const icon = nativeImage.createFromPath(path.resolve(__dirname, 'images', 'Icon.png'));
  const tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Pausar/Continuar', type: 'normal', click: () => mainWindow.webContents.send('toggle-timer') },
    { type: 'separator' },
    { label: 'Foco', type: 'normal', click: () => mainWindow.webContents.send('toggle-pomo', 'pomodoro') },
    { label: 'Pausa Curta', type: 'normal', click: () => mainWindow.webContents.send('toggle-short', 'shortRest') },
    { label: 'Pausa Longa', type: 'normal', click: () => mainWindow.webContents.send('toggle-pomo', 'longRest') },
    { type: 'separator' },
    {
      label: 'Sair',
      type: 'normal',
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip('Simple Pomodoro');
  tray.setContextMenu(contextMenu);

  ipcMain.on('btnClose', () => {
    mainWindow.hide();
  });

  ipcMain.on('btnMinimize', () => {
    mainWindow.minimize();
  });

  tray.addListener('double-click', () => {
    mainWindow.show();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
