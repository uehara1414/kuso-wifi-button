const config = require('config');
const menubar = require('menubar');
const {ipcMain} = require('electron');
const request = require('request');
//Dateクラスの拡張
require('date-utils');

var count = 0; //ボタンを押された回数

const mb = menubar({
  dir:__dirname + '/',
  icon:__dirname + '/poowifi.png',
  preloadWindow: true,
  windowPosition: 'trayLeft',
  width:200,
  height:300,
  resizable: false
});
mb.on('ready', () => {
  console.log("fun-wifi is kuso!");
});

/**
 * クソボタンを押されたら実行する
 */
ipcMain.on('button', (event, comment) => {
  count++;
  let date = new Date();
  let options = {
    uri: config.serverHost,
    headers: {
      "Content-type": "application/json",
    },
    json: {
      "date": date.toFormat("YYYY/MM/DD HH24:MI:SS"),
      "comment": comment
    }
  };
  request.post(options, (err, res, body) =>{
    console.log(body)
  });
  //カウントをフロントに投げる
  event.sender.send('count', count);
});
