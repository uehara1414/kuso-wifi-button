const menubar = require('menubar');

const mb = menubar({
  dir:__dirname + '/',
  icon:__dirname + '/bus.png',
  preloadWindow: true,
  windowPosition: 'trayLeft',
  width:200,
  eight:300,
  resizable: false
});
mb.on('ready', function ready () {
  console.log("fun-wifi is kuso!");
});
