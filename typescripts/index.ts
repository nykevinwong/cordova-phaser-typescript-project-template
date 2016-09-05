/// <reference path="./definitions/phaser.d.ts" />
/// <reference path="./definitions/cordova.d.ts"/>

class SimpleGame {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', this);
    }

    private game: Phaser.Game;
    private text: Phaser.Text;
    private vx : number  = 2;
    private vy : number  = 2;

    create() {
        var text = "Hello World!";
        var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
        this.text = this.game.add.text(0, 0, text, style);
        
    }


    update() {
                this.text.position.x +=5;
                this.text.position.y +=5;
    }

}

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

    start() { console.log("Starting app");     var game = new SimpleGame(); }
    pause() { console.log('app paused'); }
}

declare var app: Application;
var app = new Application();

document.addEventListener('pause', ()=> { app.pause(); });

app.initialize();

