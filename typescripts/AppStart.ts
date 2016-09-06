/// <reference path="./definitions/cordova.d.ts"/>
import PhaserGameApp = require("PhaserGameApp");

// Apache Cordova core

class Application {
    initialize() { this.bindEvents(); }
    bindEvents() {
            var isBrowser = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
            if ( isBrowser ) {
                document.addEventListener('deviceready', this.start, false);
            } else {
                this.start();
            }   
    }

    start() { console.log("Starting app");     var game = new PhaserGameApp(); }
    pause() { console.log('app paused'); }
}
 
declare var app: Application;
var app = new Application();

document.addEventListener('pause', ()=> { app.pause(); });

app.initialize();

