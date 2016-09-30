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

    start() { console.log("Starting app");    this.game = new PhaserGameApp();  }
    pause() { console.log('app paused'); }

    getGame(): PhaserGameApp { return this.game; }
}
 
declare var app: Application;
var app = new Application();

document.addEventListener('pause', ()=> { app.pause(); });

app.initialize();

export = app;


