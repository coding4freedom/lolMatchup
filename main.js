import { app, BrowserWindow, ipcMain } from "electron";
import path from 'path';
import url from 'url';
import axios from "axios";
import * as cheerio from 'cheerio';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
const __dirname = path.dirname(new URL (import.meta.url).pathname);

console.log('Current directory:', __dirname);
console.log('Preload script path:', path.resolve(__dirname, 'preload.js'));

const createWindow = () => {
    const win = new BrowserWindow({
        width: 500,
        height: 550,
        webPreferences: {
            preload: path.resolve(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,            
        }
    });

    win.loadFile('index.html');
};

ipcMain.handle('fetch-champions', async () => {
    console.log('IPC Handler: fetch-champions invoked');

    try {
        const { data } = await axios.get('https://universe.leagueoflegends.com/en_US/champions/');
        const $ = cheerio.load(data);
        const champions = [];
        $('div.copy_xxN7 h1').each((i, el) => {
            champions.push($(el).text().trim());
        });
        console.log('Fetched Champions:', champions);
        return champions;
    } catch (error) {
        console.error('Error fetching champions:', error);
        throw error;
    }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});