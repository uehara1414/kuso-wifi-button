const {ipcRenderer} = require('electron')

var button;
var counter; //countを表示するエリア
var comment;
var netStatus = navigator.onLine;

window.onload = () => {
  button = document.getElementById('button');
  counter = document.getElementById('counter');
  comment = document.getElementById('comment');

  buttonStatus(netStatus);
};

window.addEventListener("online", () => {
  netStatus = buttonStatus(true);
}, false);
window.addEventListener("offline", () => {
  netStatus = buttonStatus(false);
});


/**
 * ネットの状態によってボタンの色を変える
 * @param {boolean} status trueでオンライン
 * @return {boolean} paramのstatusをそのまま返す
 */
function buttonStatus(status) {
  if(status) {
    button.classList.remove('button-caution');
    button.classList.add('button-action');
  } else {
    button.classList.remove('button-action');
    button.classList.add('button-caution');
  }
  return status;
}

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