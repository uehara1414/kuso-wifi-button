# kuso-wifi-button
Wifiが繋がらないときに押して気ストレスを発散するためのボタン。バイナリのダウンロードは[こちら](https://github.com/uehara1414/kuso-wifi-button/releases/tag/v1-beta)から
## 概要
某大学のWifiがクソであることから生まれた、ストレスを目的としたボタンアプリです。  
現在の接続状況をWifiのssidとコメントとともに [Kuso Wifi Hub](https://kuso-wifi.ga) へ送信します。

![kuso-wifi-button](https://github.com/uehara1414/kuso-wifi-button/blob/master/demo/kuso-wifi-button.gif?raw=true)

## 開発

### Requirements
#### Node.js
Node.js v7.0.0

#### electron-prebuilt
```
npm install -g electron-prebuilt
```

#### Install
```
git clone git@github.com:uehara1414/kuso-wifi-button.git
cd kuso-wifi-button
npm install
```

#### デバッグ
```
electron .
```

## リリース
### Requirements
開発時の必要物に加えて、`electron-packager`が必要です
```
npm install -g electron-packager
```

### ビルド
```
# Windows
electron-packager . kuso-wifi-button --platform=win32 --electron-version=1.4.5 --icon=src/poowifi.ico
# OSX
electron-packager . kuso-wifi-button --platform=darwin --electron-version=1.4.5 --icon=src/poowifi.icns
# Linux
electron-packager . kuso-wifi-button --platform=linux --electron-version=1.4.5 --icon=src/poowifi.png
```

## プルリクエスト
こんなクソアプリですし、クソリプ送るような感覚でどしどし送ってください（マージするとは言っていない）。

## 質問
[issues](https://github.com/uehara1414/kuso-wifi-button/issues)にどうぞ。


## ライセンス
[MIT](https://github.com/uehara1414/kuso-wifi-button/blob/master/LICENSE)
