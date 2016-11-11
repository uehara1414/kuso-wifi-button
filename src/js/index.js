const {ipcRenderer} = require('electron')

var counter; //countを表示するエリア
var comment;
var netStatus = navigator.onLine;

window.addEventListener("online", () => {
  netStatus = true;
}, false);
window.addEventListener("offline", () => {
  netStatus = false;
});

window.onload = () => {
  counter = document.getElementById('counter');
  comment = document.getElementById('comment');
};

/**
 * クソWiFiボタンを押されたら実行される関数
 */
function kusoButton() {
  ipcRenderer.send('button', comment.value);
}

/**
 * 回数が更新された時に実行される
 */
ipcRenderer.on('count', (event, count) => {
  counter.innerText = count;
});