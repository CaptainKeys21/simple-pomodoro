import { app, BrowserWindow, ipcMain, Menu, NativeImage, nativeImage, Notification, Tray } from 'electron';
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
  mainWindow.setIcon(path.resolve(__dirname, 'images', 'Icon.png'));

  return mainWindow;
};

const createNotifications = (icon: NativeImage): Array<Notification> => {
  const notiPomo = new Notification({ title: 'Foco Iniciado!', icon: icon });
  const notiShort = new Notification({ title: 'Pausa Curta!', icon: icon });
  const notiLong = new Notification({ title: 'Pausa Longa!', icon: icon });

  return [notiPomo, notiShort, notiLong];
};

app.whenReady().then(() => {
  if (process.platform == 'win32') {
    app.setAppUserModelId('Simple Pomodoro');
  }
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

  const [notiPomo, notiShort, notiLong] = createNotifications(icon);

  ipcMain.on('changePomo', () => notiPomo.show());
  ipcMain.on('changeShort', () => notiShort.show());
  ipcMain.on('changeLong', () => notiLong.show());

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
