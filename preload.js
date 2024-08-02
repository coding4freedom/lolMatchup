import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    fetchData: () => ipcRenderer.invoke('fetch-data'),
});