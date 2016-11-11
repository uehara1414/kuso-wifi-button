const config = require('config');
const menubar = require('menubar');
const {ipcMain} = require('electron');
const request = require('request');
//Dateクラスの拡張
require('date-utils');
//hash生成
const crypto = require('crypto');
const sha = crypto.createHash('sha256');
var uid = sha.update(new Date().getTime().toString()).digest('hex');


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
  let json = {
    "uid": uid,
    "date": date.toFormat("YYYY/MM/DD HH24:MI:SS"),
    "comment": comment
  };
  let options = {
    uri: config.serverHost,
    headers: {
      "Content-type": "application/json",
    },
    json: json
  };
  request.post(options, (err, res, body) => {
    if(err) {
      console.log("ログを貯める");
      // event.sender.send('logSave', json);
    } else {
      console.log("貯めたログを放出して、削除する");
    }
    console.log(body)
  });
  //カウントをフロントに投げる
  event.sender.send('count', count);
});
