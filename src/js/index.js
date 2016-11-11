const {ipcRenderer} = require('electron')

var counter; //countを表示するエリア
var count = 0; //クソWiFiボタンを押された回数

window.onload = function() {
  counter = document.getElementById('counter');
};

/**
 * クソWiFiボタンを押されたら実行される関数。
 */
function kusoButton() {
  count++;
  counter.innerText = count;
  ipcRenderer.send('button', count);
}