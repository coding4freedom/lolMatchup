import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    fetchChampions: () => ipcRenderer.invoke('fetch-champions'),
});