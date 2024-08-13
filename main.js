const { app, BrowserWindow, ipcMain } = require('electron/main')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const path = require('node:path')

import fetch from 'node-fetch'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false, 
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
    //ipcMain.handle('ping', () => 'pong')
    
    ipcMain.handle('fetch-champions', async () => {
        console.log('IPC Handler: fetch-champions invoked');

        try {
            // Launch Puppeteer and navigate to the page
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('https://universe.leagueoflegends.com/en_US/champions/', {  waitUntil: 'networkidle2' });

            // Wait for the required content to load
            await page.waitForSelector('div.copy_xxN7 h1'); // Adjust selector as needed

            // Get the page content
            const content = await page.content();

            // Close the browser
            await browser.close();

            // Load content into Cheerio
            const $ = cheerio.load(content);
            const champions = [];
            $('div.copy_xxN7 h1').each((i, el) => {
                // Ensure text is properly decoded and trimmed
                champions.push($(el).text().trim());
            });

            console.log('Fetched Champions:', champions);
            return champions;
        } catch (error) {
            console.error('Error fetching champions:', error);
            throw error;
        }
    });

    // handle IPC to fetch counters
    ipcMain.handle('fetch-counters', async (event, champ) => {
      const baseUrl = `https://u.gg/lol/champions/${encodeURIComponent(champ)}/counter`;

      try {
        const response = await fetch(baseUrl);
        const html = await response.text();
        const $ = cheerio.load(html);

        const counters = [];
        $('div.counters.list.best-win-rate div.champion-name').each((index, element) => {
          counters.push($(element).text().trim());
        });

        return counters;

      } catch (error) {
        console.error('Error fetching or parsing data:', error);
        return [];
      }
    })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})