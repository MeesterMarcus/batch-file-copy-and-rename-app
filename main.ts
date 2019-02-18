import {app, BrowserWindow, screen} from 'electron';
import * as path from 'path';
import * as url from 'url';
import {dialog} from 'electron';

const fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
const electron = require('electron'), ipcMain = electron.ipcMain;

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

// ipc functions to communicate with Angular
ipcMain.on('duplicate-file', function (event, arg) {
  try {
    const destinationDirectory = require('path').join(require('os').homedir(), 'Desktop', 'GeneratedAdPages');
    if (!fs.existsSync(destinationDirectory)) {
      fs.mkdirSync(destinationDirectory);
    }
    console.debug('inside duplicate-file ipc');
    const argArray = arg.split(',');

    const fileArray = dialog.showOpenDialog({properties: ['openFile']});
    const file = fileArray[0];
    let origFileName = path.basename(file);
    const ext = path.extname(origFileName);
    origFileName = origFileName.replace(ext,'');
    const platform = require('os').platform();
    for (const adZone of argArray) {
      let slashType = '\\';
      if (platform === 'darwin') {
        slashType = '/';
      }
      const newFileName = destinationDirectory + slashType + origFileName + adZone + ext;
      console.debug('newfileName: ' + newFileName);
      fs.copyFile(file, newFileName, (err) => {
        if (err) {
          throw err;
        }
        console.debug(origFileName + ' was copied to ' + newFileName);
      });
    }
  } catch (e) {
    event.sender.send('duplicate-file-error', 'An error occurred during file generation');
  }
  event.sender.send('duplicate-file-success', 'Generation successful.');
});


function createWindow() {


  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width / 3,
    height: size.height / 2
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
