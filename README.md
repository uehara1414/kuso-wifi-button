# kuso-wifi-button
某大学のWifiが繋がらないときに押すボタン

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
electron-packager . kuso-wifi-button --platform=win32 --version=1.4.5 --icon=src/poowifi.ico
# OSX
electron-packager . kuso-wifi-button --platform=darwin --version=1.4.5 --icon=src/poowifi.icns
# Linux
electron-packager . kuso-wifi-button --platform=linux --version=1.4.5 --icon=src/poowifi.png
```

## ライセンス
[MIT](https://github.com/uehara1414/kuso-wifi-button/blob/master/LICENSE)
