import { app, BrowserWindow } from "electron";

const createWindow = () => {
    let win = new BrowserWindow({
        width: 500,
        height: 550,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    win.loadFile('index.html');
};

app.whenReady().then(createWindow);