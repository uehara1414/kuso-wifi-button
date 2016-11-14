const config = require('config');
if(config.serverHost == '') {
  console.log("Please write serverHost in default.json");
  process.exit(1);
}
const menubar = require('menubar');
const {ipcMain} = require('electron');
const request = require('request');
//Dateクラスの拡張
require('date-utils');
//hash生成
const crypto = require('crypto');
const sha = crypto.createHash('sha256');
const uid = sha.update(new Date().getTime().toString()).digest('hex');
//ssid
const wifiControl = require('wifi-control');
wifiControl.init({
  debug: true
});
//ping
const Ping = require('ping-lite');
const ping = new Ping('8.8.8.8');

var count = 0; //ボタンを押された回数

const mb = menubar({
  dir:__dirname + '/',
  icon:__dirname + '/poowifi.png',
  preloadWindow: true,
  windowPosition: 'trayLeft',
  width:200,
  height:275,
  resizable: true
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
  ping.send((err, ms) => {
    let json = {
      "uid": uid,
      "date": date.toFormat("YYYY/MM/DD HH24:MI:SS"),
      "ssid": (wifiControl.getIfaceState()['ssid']) ? wifiControl.getIfaceState()['ssid'] : '',
      "ping": (ms) ? ms : 0,
      "comment": comment
    };
    sendJson(json).then(function onFulfilled(value) {
      console.log(value);
      event.sender.send('clearLog', true);
    }).catch(function onRejected(err) {
      console.log(err);
      event.sender.send('saveLog', json);
    });
  });
  //カウントをフロントに投げる
  event.sender.send('count', count);
});


/**
 * 溜まったログを投げる
 */
ipcMain.on('logPush', (event, json) => {
  sendJson(json);
});


/**
 * kuso-wifi-serverにJSONを投げつける
 * @param {json} json jsonだよ〜
 * @return {boolean} 成功したらtrue
 */
function sendJson(json) {
  return new Promise((resolve, reject) => {
    console.log(json);
    let options = {
      uri: config.serverHost + '/honto-kuso/',
      headers: {
        "Content-type": "application/json",
      },
      json: json
    };
    request.post(options, (err, res, body) => {
      if(!err && res.statusCode == 200) resolve(body);
      else reject(err);
    });
  });
}