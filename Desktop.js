const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
require('./server.js');
let main;
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
function Run() {
  main = new BrowserWindow({
    icon: path.join(__dirname, '/sources/logo.svg'),
    // fullscreen: true,
  });
  main.maximize();
  main.loadURL('http://localhost:1400/');
  main.setMenuBarVisibility(false);
  main.setIcon(path.join(__dirname, '/public/sources/logo.png'));
}
app.on('ready', Run);
