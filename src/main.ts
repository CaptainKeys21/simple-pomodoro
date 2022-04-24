import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron';
import path from 'path';

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.resolve(__dirname, 'index.html'));
};

app.whenReady().then(() => {
  createWindow();

  const icon = nativeImage.createFromPath(path.resolve(__dirname, 'images', 'Icon.png'));
  const tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Pausar/Continuar', type: 'normal' },
    { type: 'separator' },
    { label: 'Foco', type: 'normal' },
    { label: 'Pausa Curta', type: 'normal' },
    { label: 'Pausa Longa', type: 'normal' },
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

  tray.addListener('double-click', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  //if (process.platform !== 'darwin') app.quit();
});
