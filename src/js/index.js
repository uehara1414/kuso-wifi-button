const {ipcRenderer} = require('electron')

var button;
var counter; //countを表示するエリア
var comment;
var netStatus = navigator.onLine;
var localCount = 0; //ネット未接続時のボタンを押した回数

window.onload = () => {
  button = document.getElementById('button');
  counter = document.getElementById('counter');
  comment = document.getElementById('comment');

  buttonStatus(netStatus);
};

window.addEventListener("online", () => {
  netStatus = buttonStatus(true);
  clearLog();
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
 * 送られてきたjsonを保存する
 * @param {json} json uid,date,ssid,commentが入っている
 */
ipcRenderer.on('saveLog', (event, json) => {
  localStorage.setItem(localCount++, JSON.stringify(json));
});

/**
 * 全てのログを送り、ストレージをリセット
 */
ipcRenderer.on('clearLog', (event, flag) => {
  clearLog();
});

/**
 * ネットに再接続した時に、ローカルに保存されたログを放出する
 */
function clearLog() {
  Object.keys(localStorage).forEach((key) => {
    ipcRenderer.send('logPush', JSON.parse(localStorage.getItem(key)));
  });
  localStorage.clear();
}

/**
 * 回数が更新された時に実行される
 */
ipcRenderer.on('count', (event, count) => {
  counter.innerText = count;
});


/**
 * アプリを終了する
 */
function exit() {
  ipcRenderer.send('exit', true);
}