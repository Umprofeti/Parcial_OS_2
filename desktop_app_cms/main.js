// Importar las dependencias
const { app, BrowserWindow, Menu } = require("electron");
const url = require('url')

// Crear una ventana del navegador
app.on("ready", () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Parcial 2 OS CMS",
    webPreferences: {
        webSecurity: false,
        allowRunningInsecureContent: true
    }
  });

  const template = [
    {
        label: 'frontend',
        click: function (){
            win.loadURL("http://localhost:3000/")
        }
    },
    {
        label: 'backend',
        click: function(){
            win.loadURL("http://localhost:3040/")
        }
    },
    {
        label: 'recargar',
        click: function(){
            win.reload()
        }
    }
  ] 

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu);
  win.loadURL("http://localhost:3040/")
});
