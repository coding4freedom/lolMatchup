const { contextBridge, ipcRenderer } = require('electron/renderer')

console.log('Preload script loaded.')


contextBridge.exposeInMainWorld('api', {
    fetchChampions: async () => {
        console.log('Preload API: fetchChampions invoked');
        try {
            return await ipcRenderer.invoke('fetch-champions');
        } catch(error) {
            console.error('Preload API error', error);
            throw error;
        }        
    }    
});