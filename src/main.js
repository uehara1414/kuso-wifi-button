const menubar = require('menubar');
const {ipcMain} = require('electron');

const mb = menubar({
  dir:__dirname + '/',
  icon:__dirname + '/poowifi.png',
  preloadWindow: true,
  windowPosition: 'trayLeft',
  width:200,
  height:300,
  resizable: false
});
mb.on('ready', function ready () {
  console.log("fun-wifi is kuso!");
});

/**
 * クソボタンを押されたら実行する
 */
ipcMain.on('button', (event, arg) => {
  console.log(arg);
});
